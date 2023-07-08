import React from 'react';
import {LayoutChangeEvent, StyleProp, View, ViewStyle} from 'react-native';

export interface CustomViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const CustomView: React.FC<CustomViewProps> = ({
  children,
  style,
  onLayout,
}) => {
  return (
    <View style={style} onLayout={onLayout}>
      {children}
    </View>
  );
};
