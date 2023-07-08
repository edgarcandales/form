import React, {Fragment} from 'react';
import {
  View,
  Animated,
  I18nManager,
  Platform,
  StyleSheet,
  TextStyle,
} from 'react-native';

export type LineType = 'solid' | 'none';

export interface OutlineProps {
  lineType: LineType;
  disabled?: boolean | undefined;
  restricted?: boolean | undefined;

  tintColor: string;
  baseColor: string;
  errorColor: string;

  lineWidth: number;
  activeLineWidth: number;
  disabledLineWidth: number;

  focusAnimation: Animated.Value;
  labelAnimation: Animated.Value;
  labelWidth: Animated.Value;

  contentInset: {
    left: number;
    right: number;
  };
}

export const Outline: React.FC<OutlineProps> = ({
  lineType = 'solid',
  disabled = false,
  restricted = false,
  tintColor,
  baseColor,
  errorColor,
  lineWidth,
  activeLineWidth,
  disabledLineWidth,
  focusAnimation,
  labelAnimation,
  labelWidth,
  contentInset,
}) => {
  function borderProps() {
    if (disabled) {
      return {
        borderColor: baseColor,
        borderWidth: disabledLineWidth,
      };
    }
    if (restricted) {
      return {
        borderColor: errorColor,
        borderWidth: activeLineWidth,
      };
    }

    return {
      borderColor: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      }),
      borderWidth: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [activeLineWidth, lineWidth, activeLineWidth],
      }),
      borderStyle: lineType as any,
    };
  }

  if (lineType === 'none') {
    return null;
  }

  let labelOffset = 2 * (contentInset.left - 2 * borderRadius);
  let lineOffset = Animated.add(labelWidth, labelOffset);

  let topLineContainerStyle = {
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1,
      },
      {
        translateX: Animated.multiply(labelAnimation, lineOffset),
      },
    ],
  };

  let leftContainerStyle = {
    width: contentInset.left - borderRadius,
  };

  let rightContainerStyle = {
    width: contentInset.right - borderRadius,
  };

  let topContainerStyle = {
    left: leftContainerStyle.width,
    right: rightContainerStyle.width,
  };

  let lineStyle = borderProps();

  return (
    <Fragment>
      <View
        style={[styles.topContainer, topContainerStyle]}
        pointerEvents="none">
        <Animated.View style={[styles.topLineContainer, topLineContainerStyle]}>
          <Animated.View style={[styles.borderTop, lineStyle]} />
        </Animated.View>
      </View>

      <View
        style={[styles.rightContainer, rightContainerStyle]}
        pointerEvents="none">
        <Animated.View style={[styles.borderRight, lineStyle]} />
      </View>

      <View style={styles.bottomContainer} pointerEvents="none">
        <Animated.View style={[styles.borderBottom, lineStyle]} />
      </View>

      <View
        style={[styles.leftContainer, leftContainerStyle]}
        pointerEvents="none">
        <Animated.View style={[styles.borderLeft, lineStyle]} />
      </View>
    </Fragment>
  );
};

export default Outline;

const borderRadius = 4;

let containerStyle: TextStyle = {
  position: 'absolute',
  overflow: 'hidden',
};

const styles = StyleSheet.create({
  borderLeft: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    right: -borderRadius,
    bottom: -borderRadius,
  },

  borderRight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    left: -borderRadius,
    bottom: -borderRadius,
  },

  borderBottom: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    top: -borderRadius,

    /* XXX: Android positioning error workaround */
    bottom: StyleSheet.hairlineWidth,
  },

  borderTop: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    left: -borderRadius,
    right: -borderRadius,
    bottom: -borderRadius,
  },

  leftContainer: {
    ...containerStyle,

    top: 0,
    left: 0,
    width: borderRadius,
    height: borderRadius,
  },

  rightContainer: {
    ...containerStyle,

    top: 0,
    right: 0,
    height: borderRadius,
  },

  bottomContainer: {
    ...containerStyle,

    top: borderRadius - (Platform.OS === 'android' ? 0.25 : 0),
    left: 0,
    right: 0,
    bottom: 0,
  },

  topContainer: {
    ...containerStyle,

    top: 0,
    height: borderRadius,
  },

  topLineContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
