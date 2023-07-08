import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface AffixProps {
  numberOfLines?: number | undefined;
  style?: StyleProp<ViewStyle | TextStyle> | undefined;
  color: string;
  fontSize: number;
  type: 'prefix' | 'suffix';
  labelAnimation?: Animated.Value | undefined;
  children?: React.ReactNode;
}

export const Affix: React.FC<AffixProps> = ({
  style,
  color,
  fontSize,
  type,
  labelAnimation,
  children,
}) => {
  let containerStyle: any = {
    height: fontSize * 1.5,
    opacity: labelAnimation,
  };

  let textStyle: any = {
    includeFontPadding: false,
    textAlignVertical: 'top',
    fontSize,
    color,
  };

  switch (type) {
    case 'prefix':
      containerStyle.paddingRight = 8;
      textStyle.textAlign = 'left';
      break;

    case 'suffix':
      containerStyle.paddingLeft = 8;
      textStyle.textAlign = 'right';
      break;
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.Text style={[style, textStyle]}>{children}</Animated.Text>
    </Animated.View>
  );
};

export default Affix;

const styles = StyleSheet.create({
  container: {
    top: 2,
    justifyContent: 'center',
  },
});
