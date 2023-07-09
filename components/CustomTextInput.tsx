import React, {FC, useState} from 'react';
import type {KeyboardType} from 'react-native';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native';
import ClearIcon from '../assets/images/app_arrow.svg';
import {ColorUtil} from '../utils/ColorUtil';
import TextField from './mui/MuiTextfield/Field';

export type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password';

export interface CustomTextInputProps {
  label: string;
  value?: string | null;
  textColor?: 'black' | undefined;
  error?: string | undefined;
  errorColor?: 'red' | undefined;
  baseColor?: undefined;
  placeholder?: string;
  placeholderTextColor?: 'gray' | undefined;
  secureTextEntry?: boolean | undefined;
  onChangeText?: (text: string, unmasked: string) => void | undefined;
  renderLeftAccessory?(): JSX.Element | undefined;
  renderRightAccessory?(): JSX.Element | undefined;
  clearButton?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean | undefined;
  autoFocus?: boolean | undefined;
  onFocus?: (() => void) | undefined;
  onBlur?: (() => void) | undefined;
  fontWeight?: '400' | '700' | undefined;
  keyboardType?: KeyboardType;
  mask?: (string | RegExp)[] | undefined;
  spellCheck?: boolean;
  bgColor?: string | undefined;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  externalTexRef?: React.RefObject<HTMLDivElement>;
  textContentType?: TextContentType;
  required?: boolean;
  maxLength?: number;
}
interface TextInputState {
  value?: string | null;
}

export const CustomTextInput: FC<CustomTextInputProps> = ({
  label = 'Label',
  value = '',
  placeholder = '',
  textColor = 'text',
  baseColor = 'text',
  errorColor = 'error',
  error,
  placeholderTextColor = '#707070',
  secureTextEntry = false,
  onChangeText,
  renderLeftAccessory,
  renderRightAccessory,
  clearButton,
  autoCapitalize,
  autoCorrect,
  autoFocus = false,
  onFocus,
  onBlur,
  fontWeight = '400',
  keyboardType,
  mask = undefined,
  spellCheck = true,
  bgColor = '#D3D3D3',
  onSubmitEditing,
  externalTexRef,
  textContentType = 'none',
  required = false,
  maxLength,
}) => {
  const textFieldRef: React.RefObject<TextField> = externalTexRef
    ? externalTexRef
    : React.createRef();
  const [_state, setState] = useState<any>({
    value: value,
  });
  const onChangeTextField = (text: string, unmasked: string): void => {
    if (onChangeText) {
      onChangeText(text, unmasked);
    }
  };
  const clearText = () => {
    if (textFieldRef.current) {
      textFieldRef.current.clear();
    }
  };
  var rightAcc = renderRightAccessory;
  if (
    value &&
    value?.length > 0 &&
    clearButton &&
    textFieldRef.current?.isFocused()
  ) {
    rightAcc = () => (
      <TouchableOpacity
        onPress={() => clearText()}
        style={styles.clearButtonContainer}>
        <ClearIcon width={20} height={20} fill={'blue'} />
      </TouchableOpacity>
    );
  }
  return (
    <TextField
      textContentType={textContentType}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      value={value ?? undefined}
      secureTextEntry={secureTextEntry}
      onChangeText={(masked: (string | RegExp)[]) =>
        onChangeTextField(masked, undefined as any)
      }
      mask={mask as any}
      ref={textFieldRef}
      label={label}
      baseColor={baseColor ? 'black' : undefined}
      tintColor={styles.tint.color}
      labelTextStyle={styles.label}
      lineWidth={0}
      autoCapitalize={autoCapitalize}
      textColor={textColor ? 'black' : undefined}
      errorColor={errorColor ? 'yellow' : undefined}
      error={error}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor ? 'gray' : undefined}
      autoCorrect={autoCorrect}
      activeLineWidth={0}
      style={[styles.tfStyle, {fontWeight: fontWeight}]}
      contentInset={{top: 4, input: 0, label: 4}}
      labelOffset={{y0: -4, y1: 4}}
      renderLeftAccessory={renderLeftAccessory}
      renderRightAccessory={rightAcc}
      autoFocus={autoFocus}
      onFocus={() => {
        setState({});
        if (onFocus) {
          onFocus();
        }
      }}
      onBlur={() => {
        setState({});
        if (onBlur) {
          onBlur();
        }
      }}
      containerStyle={
        textFieldRef?.current?.isFocused()
          ? [styles.outerContainerFocus, {backgroundColor: bgColor}]
          : [styles.outerContainer, {backgroundColor: bgColor}]
      }
      spellCheck={spellCheck}
      required={required}
      maxLength={maxLength}
    />
  );
};

function createTextInputStyles(): any {
  const outlineColor = ColorUtil.shadeColor('blue', 0.6);
  console.log(`Outline COLOR = ${outlineColor} ===> #C7E5DF`);
  const bgColor = ColorUtil.shadeColor('blue', 0.875);
  console.log(`BG COLOR = ${bgColor} ===> #F1F9F7`);

  return StyleSheet.create({
    clearButtonContainer: {
      marginBottom: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tint: {
      color: 'red',
    },
    label: {
      // color: AppProps.textColor,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'SFProText-Regular',
    },
    tfStyle: {
      fontSize: 16,
      fontFamily: 'SFProText-Regular',
    },
    outerContainer: {
      paddingHorizontal: 12,
      marginVertical: 8,
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      alignSelf: 'stretch',
    },
    outerContainerFocus: {
      paddingHorizontal: 12,
      marginVertical: 8,
      paddingTop: 0,
      paddingBottom: 0,
      alignSelf: 'stretch',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
  });
}

var styles = createTextInputStyles();

//let onChange = (_newProps: IThemeProps): void => {
//  styles = createAHTextInputStyles();
//};

//AHTheme.addChangeListener(onChange);
