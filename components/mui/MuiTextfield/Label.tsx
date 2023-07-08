import React from 'react';
import {Animated, TextStyle, StyleSheet, View} from 'react-native';

export interface LabelOffset {
  x0?: number | undefined;
  y0?: number | undefined;
  x1?: number | undefined;
  y1?: number | undefined;
}

export interface LabelProps {
  numberOfLines?: number | undefined;
  disabled?: boolean | undefined;
  restricted?: boolean | undefined;
  fontSize?: number;
  activeFontSize?: number;
  baseColor?: string;
  tintColor?: string;
  errorColor?: string;

  focusAnimation: Animated.Value;
  labelAnimation: Animated.Value;

  contentInset?: {label?: number | undefined};
  offset?: LabelOffset;
  style?: TextStyle | undefined;
  label?: string;
  children?: React.ReactNode;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  disabled = false,
  restricted = false,
  fontSize,
  activeFontSize,
  baseColor,
  tintColor,
  errorColor,
  focusAnimation,
  labelAnimation,
  contentInset,
  offset,
  style,
  label,
  required,
  ...props
}) => {
  if (label == null) {
    return null;
  }

  let color = disabled
    ? baseColor
    : restricted
    ? errorColor
    : focusAnimation?.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [
          errorColor as string,
          baseColor as string,
          tintColor as string,
        ],
      });

  let textStyle = {
    lineHeight: (style && style.lineHeight) || fontSize,
    fontSize,
    color,
  };

  let {x0, y0, x1, y1} = offset as LabelOffset;

  let y0_ = y0 ? y0 : 0;
  y0_ += activeFontSize as number;
  y0_ += (contentInset as {label: number}).label;
  y0_ += (fontSize as number) * 0.25;
  let y1_ = y1 ? y1 : 0;
  let x0_ = x0 ? x0 : 0;
  let x1_ = x1 ? x1 : 0;

  let containerStyle = {
    transform: [
      {
        scale: (labelAnimation as Animated.Value).interpolate({
          inputRange: [0, 1],
          outputRange: [1, (activeFontSize as number) / (fontSize as number)],
        }),
      },
      {
        translateY: labelAnimation?.interpolate({
          inputRange: [0, 1],
          outputRange: [y0_, y1_],
        }),
      },
      {
        translateX: labelAnimation?.interpolate({
          inputRange: [0, 1],
          outputRange: [x0_, x1_],
        }),
      },
    ],
  };
  return (
    <Animated.View style={[styles.container, containerStyle as any]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Animated.Text style={[style, textStyle]} {...props}>
          {label}
        </Animated.Text>
        {required && (
          <Animated.Text style={[textStyle, {lineHeight: 15}]}>*</Animated.Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '200%',
    paddingLeft: '50%',
  },

  text: {
    textAlign: 'left',
    includeFontPadding: false,
    textAlignVertical: 'top',
  },
});
