import {HeaderShownContext} from '@react-navigation/elements';
import React, {FC} from 'react';
import {
  Appearance,
  ColorValue,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AHStack} from '../components/AHStack';
import useTheme from '../hooks/useTheme';
import {tID} from '../util/TestID';
import {AHStyles, AppStyles} from './AHStyles';
export interface AHTopViewProps extends AHStyles.View {
  testID?: string | undefined;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarColor?: ColorValue | undefined;
  padding?: number;
  children?: React.ReactNode;
  hasNavHeader?: boolean;
  dismissKeyboardOnPress?: boolean | undefined;
  style?: StyleProp<ViewStyle> | undefined;
}

export const AHTopView: FC<AHTopViewProps> = ({
  testID,
  statusBarStyle,
  padding = 0,
  children,
  hasNavHeader: _hasNavHeader = false,
  statusBarColor,
  dismissKeyboardOnPress,
  ...sx
}) => {
  const isParentHeaderShown = React.useContext(HeaderShownContext);
  const theme = useTheme();
  console.log(Appearance.getColorScheme() === 'dark', 'isParentHeaderShown');
  return (
    <SafeAreaView
      onStartShouldSetResponder={_event => {
        if (dismissKeyboardOnPress) {
          Keyboard.dismiss();
        }
        return false;
      }}
      testID={tID(testID)}
      style={[
        AppStyles.mainTopContainer,
        {backgroundColor: theme.colors.active.background},
        sx.bgColor ? {backgroundColor: sx.bgColor} : null,
      ]}>
      <AHStack
        style={[
          AppStyles.topContainer,
          {padding: padding, backgroundColor: theme.colors.active.background},
          AHStyles.toViewStyle(sx),
        ]}>
        <StatusBar
          barStyle={
            statusBarStyle !== undefined
              ? statusBarStyle
              : isParentHeaderShown
              ? 'light-content'
              : 'dark-content'
          }
          backgroundColor={
            statusBarColor
              ? statusBarColor
              : isParentHeaderShown
              ? theme.colors.active.primary
              : theme.colors.active.background
          }
        />
        {children}
      </AHStack>
    </SafeAreaView>
  );
};
