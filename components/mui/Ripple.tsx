import React, {PureComponent} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  I18nManager,
  LayoutChangeEvent,
  GestureResponderEvent,
  ViewProps,
} from 'react-native';

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export interface RippleProps extends TouchableWithoutFeedbackProps, ViewProps {
  rippleColor?: string | undefined;
  rippleOpacity?: number | undefined;
  rippleDuration?: number | undefined;
  rippleSize?: number | undefined;
  rippleContainerBorderRadius?: number | undefined;
  rippleCentered?: boolean | undefined;
  rippleSequential?: boolean | undefined;
  rippleFades?: boolean | undefined;
  disabled?: boolean | undefined;
  onRippleAnimation?(
    animation: Animated.CompositeAnimation,
    callback: () => void,
  ): void;
}

interface RippleInfo {
  unique: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  R: number;
}

interface RippleState {
  width?: number | undefined;
  height?: number | undefined;
  ripples: RippleInfo[];
}

export default class Ripple extends PureComponent {
  unique: number;
  mounted: boolean;

  static defaultProps: RippleProps = {
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,

    onRippleAnimation: (animation, callback) => animation.start(callback),
  };

  constructor(props: RippleProps) {
    super(props);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout = (event: LayoutChangeEvent) => {
    let {width, height} = event.nativeEvent.layout;
    let {onLayout} = this.props as RippleProps;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    this.setState({width, height});
  };

  onPress = (event: GestureResponderEvent) => {
    let {ripples} = this.state as RippleState;
    let {onPress, rippleSequential} = this.props as RippleProps;

    if (!rippleSequential || !ripples.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => {
          if (onPress) {
            onPress(event);
          }
        });
      }

      this.startRipple(event);
    }
  };

  onLongPress = (event: GestureResponderEvent) => {
    let {onLongPress} = this.props as RippleProps;

    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => {
        if (onLongPress) {
          onLongPress(event);
        }
      });
    }

    this.startRipple(event);
  };

  onPressIn = (event: GestureResponderEvent) => {
    let {onPressIn} = this.props as RippleProps;

    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  };

  onPressOut = (event: GestureResponderEvent) => {
    let {onPressOut} = this.props as RippleProps;

    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  };

  onAnimationEnd = () => {
    if (this.mounted) {
      let oldState = this.state as RippleState;
      let newState: RippleState = {ripples: oldState.ripples.slice(1)};
      this.setState(newState);
    }
  };

  startRipple(event: GestureResponderEvent) {
    let {width, height} = this.state as RippleState;
    let {rippleDuration, rippleCentered, rippleSize, onRippleAnimation} = this
      .props as RippleProps;

    let w2 = 0.5 * (width ? width : 0);
    let h2 = 0.5 * (height ? height : 0);

    let {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    let offsetX = Math.abs(w2 - locationX);
    let offsetY = Math.abs(h2 - locationY);

    let rSize = rippleSize ? rippleSize : 0;
    let R =
      rSize > 0
        ? 0.5 * rSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    let ripple: RippleInfo = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    let animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    if (onRippleAnimation) {
      onRippleAnimation(animation, this.onAnimationEnd);
    }

    let oldState = this.state as RippleState;
    let newState: RippleState = {ripples: oldState.ripples.concat(ripple)};
    this.setState(newState);
  }

  renderRipple = ({unique, progress, locationX, locationY, R}: RippleInfo) => {
    let {rippleColor, rippleOpacity, rippleFades} = this.props as RippleProps;

    let rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity as number, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  render() {
    let {ripples} = this.state as RippleState;
    let {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLongPress,
      ...props
    } = this.props as RippleProps;

    let touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,

      // ...('web' !== Platform.OS ? {nativeID} : null),
    };

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
