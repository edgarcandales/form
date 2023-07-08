import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

export interface CounterProps {
  count: number;
  limit?: number | undefined;
  baseColor: string;
  errorColor: string;
  style?: TextStyle | undefined;
}

export const Counter: React.FC<CounterProps> = ({
  count,
  limit,
  baseColor,
  errorColor,
  style,
}) => {
  if (limit === undefined) {
    return null;
  }

  let textStyle = {
    color: count > limit ? errorColor : baseColor,
  };

  return (
    <Text style={[styles.text, style, textStyle]}>
      {count} / {limit}
    </Text>
  );
};

export default Counter;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
    backgroundColor: 'transparent',
    paddingVertical: 2,
    marginLeft: 8,
  },
});
