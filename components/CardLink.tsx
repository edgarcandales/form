import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Arrow from '../assets/images/app_arrow.svg';
import {CustomText} from './CustomText';
import Ripple from './mui/Ripple';

export interface CardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
  variant?: 'outline';
}

export interface CardLinkProps extends CardProps {
  ref?: React.RefObject<Ripple>;
  onPress?: (() => void) | undefined;
  showArrow?: boolean | undefined;
  disable?: boolean | undefined;
}

export const CardLink: React.FC<CardLinkProps> = ({
  children,
  variant,
  onPress,
  showArrow,
  style,
  ref,
  ...sx
}) => {
  return (
    <Ripple
      ref={ref}
      onPress={onPress}
      rippleContainerBorderRadius={variant === 'outline' ? 10 : 20}
      style={style}>
      {children}
      {showArrow ? (
        <CustomText style={{}}>
          <Arrow width={20} height={20} fill={'red'} />
        </CustomText>
      ) : null}
    </Ripple>
  );
};
