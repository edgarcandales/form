import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ClearIcon from '../assets/images/app_clear.svg';
import {ColorUtil} from '../utils/ColorUtil';
import TextField from './mui/MuiTextfield/Field';

export interface TextInputProps {
  label: string;
  value?: string | null;
  textColor?: string | undefined;
  error?: string | undefined;
  errorColor?: string | undefined;
  baseColor?: string | undefined;
  placeholder?: string;
  placeholderTextColor?: string | undefined;
  secureTextEntry?: boolean | undefined;
  onChangeText?: (text: string, unmasked: string) => void | undefined;
  renderLeftAccessory?(): JSX.Element | undefined;
  renderRightAccessory?(): JSX.Element | undefined;
  clearButton?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean | undefined;
  testID?: string | undefined;
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
  externalTexRef?: any;
  textContentType?: TextContentType;
  required?: boolean;
  maxLength?: number;
}

interface AHTextInputState {
  value?: string;
}
const InputSelector: FC<TextInputProps> = ({
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
  testID,
  autoFocus = false,
  onFocus,
  onBlur,
  fontWeight = '400',
  keyboardType,
  mask = undefined,
  spellCheck = true,
  bgColor = 'white',
  onSubmitEditing,
  externalTexRef,
  textContentType = 'none',
  required,
}) => {
  const textFieldRef: React.RefObject<TextField> = externalTexRef
    ? externalTexRef
    : React.createRef();
  const [_state, setState] = useState<AHTextInputState>({
    value: value ?? undefined,
  });
  const onChangeText1 = (text: string, unmasked: string): void => {
    //const p = props as AHTextInputProps;
    if (onChangeText) {
      onChangeText(text, unmasked);
    }
  };
  const clearText = () => {
    if (textFieldRef.current) {
      textFieldRef.current.clear();
    }
  };
  //  const p = props as AHTextInputProps;
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
        <ClearIcon width={20} height={20} fill={'red'} />
      </TouchableOpacity>
    );
  }
  return (
    <>
      <TextField
        textContentType={textContentType}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        value={value ?? ''}
        secureTextEntry={secureTextEntry}
        onChangeText={(masked: string) =>
          onChangeText1(masked, undefined as any)
        }
        mask={mask as any}
        ref={textFieldRef}
        label={label}
        baseColor={baseColor ? 'red' : undefined}
        tintColor={styles.tint.color}
        labelTextStyle={styles.label}
        lineWidth={0}
        autoCapitalize={autoCapitalize}
        textColor={textColor ? 'blue' : undefined}
        errorColor={errorColor ? 'red' : undefined}
        error={error}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ? 'blue' : undefined}
        autoCorrect={autoCorrect}
        activeLineWidth={0}
        //  style={styles.tfStyle}
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
          externalTexRef?.current?.state?.showPicker
            ? [styles.outerContainerFocus, {backgroundColor: bgColor}]
            : [styles.outerContainer, {backgroundColor: bgColor}]
        }
        spellCheck={spellCheck}
        required={required}
      />
    </>
  );
};

function createAHTextInputStyles(): any {
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
      color: 'blue',
    },
    label: {
      // color: AppProps.textColor,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'SFProText-Regular',
    },
    tfStyle: {
      // color: AppProps.textColor,
      fontSize: 16,
      fontFamily: 'SFProText-Regular',
    },
    outerContainer: {
      paddingHorizontal: 12,
      marginVertical: 8,
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'red',
      alignSelf: 'stretch',
    },
    outerContainerFocus: {
      paddingHorizontal: 12,
      marginVertical: 8,
      paddingTop: 0,
      paddingBottom: 0,
      alignSelf: 'stretch',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'red',
    },
  });
}
let styles = createAHTextInputStyles();

const onChange = (_newProps: IThemeProps): void => {
  styles = createAHTextInputStyles();
};
export default InputSelector;
