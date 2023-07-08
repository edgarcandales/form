import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Platform, View} from 'react-native';

export type LineType = 'solid' | 'dotted' | 'dashed' | 'none';

export interface LineProps {
  lineType?: LineType | undefined;
  disabledLineType?: LineType | undefined;
  disabled?: boolean | undefined;
  restricted?: boolean | undefined;

  tintColor?: string;
  baseColor?: string;
  errorColor?: string;

  lineWidth: number;
  activeLineWidth: number;
  disabledLineWidth: number;

  focusAnimation?: Animated.Value;
}

export const Line: React.FC<LineProps> = ({
  lineType = 'solid',
  disabledLineType = 'dotted',
  disabled = false,
  restricted = false,
  tintColor,
  baseColor,
  errorColor,
  lineWidth,
  activeLineWidth,
  disabledLineWidth,
  focusAnimation,
}) => {
  const [maxLineWidth, setMaxLineWidth] = useState<number>(1);

  useEffect(() => {
    let mlWidth = Math.max(lineWidth, activeLineWidth, disabledLineWidth, 1);
    if (mlWidth !== maxLineWidth) {
      setMaxLineWidth(mlWidth);
    }
  }, [lineWidth, activeLineWidth, disabledLineWidth]);

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
      borderColor: focusAnimation?.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [
          errorColor as string,
          baseColor as string,
          tintColor as string,
        ],
      }),

      borderWidth: focusAnimation?.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [activeLineWidth, lineWidth, activeLineWidth],
      }),
    };
  }

  let borderStyle = disabled ? disabledLineType : lineType;
  if (borderStyle === 'none') {
    return null;
  }

  let [top, right, left] = Array.from(new Array(3), () => -1.5 * maxLineWidth);
  let lineStyle = {
    ...borderProps(),

    borderStyle,
    top,
    right,
    left,
  };

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.line, lineStyle]} />
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    bottom: 0,

    ...Platform.select({
      android: {borderRadius: Number.EPSILON},
    }),
  },

  container: {
    ...StyleSheet.absoluteFillObject,

    overflow: 'hidden',
  },
});
