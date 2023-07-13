import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import NavArrow from '../assets/images/app_arrow.svg';
import {tID} from '../utils/TestID';

import {
  default as NavListItemArrow,
  default as PopupArrow,
} from '../assets/images/app_arrow.svg';
import {CustomText} from './CustomText';
import {CustomView} from './CustomView';
import Ripple from './mui/Ripple';

export type ButtonActionType =
  | 'navigate'
  | 'navigate-list-item'
  | 'plain'
  | 'popup';
export type ButtonVariantType = 'solid' | 'outline' | 'text';

export interface CustomButtonProps {
  testID?: string | undefined;
  title: string;
  numberOfLines?: number | undefined;
  actionType?: any;
  disabled?: boolean;
  showDisabledHint?: boolean;
  variant?: any;
  outlineBgColor?: string;
  showOutlineBorder?: boolean | undefined;
  onPress?: (() => void) | undefined;
  leftItem?: JSX.Element;
  leftItemSpacing?: number | undefined;
  rightItem?: JSX.Element;
  rightItemSpacing?: number | undefined;
  color?: string;
  outlineBorderColor?: string;
  textVariant?: string;
  style?: any;
}

export const CustomButton: FC<CustomButtonProps> = ({
  testID,
  title = '',
  numberOfLines = 1,
  actionType = 'plain',
  disabled = false,
  showDisabledHint = true,
  variant = 'solid',
  onPress,
  leftItem,
  rightItem,
  color = 'primary',
  outlineBorderColor = color,
  textVariant = 'font_700_16',
  style,
  leftItemSpacing = 4,
  rightItemSpacing = 8,
  outlineBgColor = 'contrast',
  showOutlineBorder = true,
}) => {
  const isSolid: boolean = variant === 'solid';
  const isText: boolean = variant === 'text';
  const isPlain: boolean = actionType === 'plain';
  const isNavigate: boolean =
    actionType === 'navigate' || actionType === 'navigate-list-item';

  let colorValue = 'red';
  let outlineBorderColorValue = 'red';

  var variantItem: JSX.Element | undefined;
  if (actionType === 'navigate') {
    variantItem = (
      <NavArrow width={20} height={20} fill={isSolid ? 'white' : colorValue} />
    );
  } else if (actionType === 'navigate-list-item') {
    variantItem = <NavListItemArrow width={20} height={20} fill={'red'} />;
  } else if (actionType === 'popup') {
    variantItem = <PopupArrow width={16} height={16} fill={'red'} />;
  }

  return (
    <Ripple
      testID={tID(testID)}
      rippleContainerBorderRadius={0}
      disabled={disabled}
      style={[
        isText
          ? isNavigate
            ? styles.textBaseNavigate
            : styles.textBase
          : isPlain
          ? styles.base
          : styles.actionBase,
        disabled && showDisabledHint
          ? {
              backgroundColor: 'red',
              borderRadius: 5,
              paddingHorizontal: 5,
            }
          : isSolid
          ? {
              backgroundColor: 'red',
              borderRadius: 5,
              paddingHorizontal: 16,
            }
          : isText
          ? {}
          : {
              backgroundColor: 'blue',
              borderColor: outlineBorderColorValue,
              borderWidth: showOutlineBorder ? 1 : 0,
              borderRadius: 5,
              paddingHorizontal: 16,
            },
        style,
      ]}
      onPress={() => onPress?.()}>
      <CustomView style={{flexDirection: 'row'}}>
        {leftItem ? (
          <CustomView style={{justifyContent: 'center'}}>{leftItem}</CustomView>
        ) : null}
        <CustomText style={{alignSelf: 'center'}} numberOfLines={numberOfLines}>
          {title}
        </CustomText>
        {rightItem ? (
          <CustomView style={{justifyContent: 'center'}}>
            {rightItem}
          </CustomView>
        ) : null}
      </CustomView>
      {variantItem ? (
        <CustomView style={{justifyContent: 'center'}}>
          {variantItem}
        </CustomView>
      ) : null}
    </Ripple>
  );
};

const styles = {
  base: {
    width: 262,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'row',
  },
  actionBase: {
    width: 262,
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'row',
  },
  textBase: {
    justifyContent: 'center',
    alignSelf: 'center',
    direction: 'row',
  },
  textBaseNavigate: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    direction: 'row',
  },
};
