import React, {useState, useEffect} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface HelperProps {
  title?: string | undefined;
  error?: string | undefined;
  disabled?: boolean | undefined;
  style?: StyleProp<ViewStyle | TextStyle> | undefined;
  baseColor?: string | undefined;
  errorColor?: string | undefined;
  focusAnimation?: Animated.Value | undefined;
}

export const Helper: React.FC<HelperProps> = ({
  title,
  error,
  disabled,
  style,
  baseColor,
  errorColor,
  focusAnimation,
}) => {
  const [errored, setErrored] = useState<boolean>(!!error);
  const [opacity] = useState<Animated.AnimatedInterpolation<any> | undefined>(
    focusAnimation
      ? focusAnimation.interpolate({
          inputRange: [-1, -0.5, 0],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        })
      : undefined,
  );

  var animationValue: number | undefined;

  useEffect(() => {
    function onAnimation(state: {value: number}) {
      if (animationValue) {
        if (animationValue > -0.5 && state.value <= -0.5) {
          setErrored(true);
        }

        if (animationValue < -0.5 && state.value >= -0.5) {
          setErrored(false);
        }
      }

      animationValue = state.value;
    }

    let listener = focusAnimation?.addListener(onAnimation);

    return function cleanup() {
      if (listener) {
        focusAnimation?.removeListener(listener);
      }
    };
  }, []);

  let text = errored ? error : title;
  if (text == null) {
    return null;
  }

  let textStyle = {
    opacity,

    color: !disabled && errored ? errorColor : baseColor,
  };

  return (
    <Animated.Text style={[styles.text, style, textStyle]}>
      {text}
    </Animated.Text>
  );
};

export default Helper;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: 'transparent',
    paddingVertical: 2,
    textAlign: 'left',
  },
});
