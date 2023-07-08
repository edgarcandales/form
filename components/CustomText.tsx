import React from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';

export interface CustomTextProps {
  numberOfLines?: number | undefined;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle> | undefined;
  onPress?: (() => void) | undefined;
}

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  numberOfLines = undefined,
  style,
  onPress,
}) => {
  return (
    <Text onPress={onPress} numberOfLines={numberOfLines} style={style}>
      {children}
    </Text>
  );
};
