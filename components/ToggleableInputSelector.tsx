import React, {MutableRefObject, RefObject} from 'react';
import {Keyboard, LayoutChangeEvent} from 'react-native';
import Open from '../assets/images/app_down_arrow.svg';
import {getFormattedDate} from '../utils/FunctionUtils';
import {CardLink} from './CardLink';
import {CustomText} from './CustomText';
import {CustomTextInput} from './CustomTextInput';
import {CustomView} from './CustomView';
import PickerSelector from './PickerSelector';

type ToggleableInputSelectorProps = {
  externalTexRef:
    | RefObject<HTMLDivElement>
    | MutableRefObject<HTMLDivElement | null | undefined>
    | undefined;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string, unmasked?: string | undefined) => void;
  actionElement: 'input' | 'read-only' | 'datePicker' | 'selector';
  textColor: string;
  bgColor?: string;
  keyboardType?: 'numeric' | 'email-address' | 'default' | 'phone-pad';
  mask: (string | RegExp)[] | undefined;
  onFocus: () => void;
  handleFocusNext: () => void;
  handleFocusPrevious: () => void;
  textContentType?: string | null;
  data: any;
  required?: boolean;
  maxLength?: number;
  isError?: boolean;
  onBlur?: () => void;
  errorMessage?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const ToggleableInputSelector: React.FC<ToggleableInputSelectorProps> = ({
  externalTexRef,
  label,
  placeholder,
  value,
  onChangeText,
  actionElement,
  textColor = 'primary',
  bgColor,
  keyboardType,
  mask,
  onFocus,
  handleFocusNext,
  handleFocusPrevious,
  textContentType,
  data,
  required,
  maxLength,
  isError,
  onBlur,
  errorMessage,
  onLayout,
}) => {
  return (
    <CustomView onLayout={onLayout}>
      {actionElement === 'input' && (
        <CustomTextInput
          onSubmitEditing={handleFocusNext}
          externalTexRef={externalTexRef}
          textColor={'red'}
          fontWeight={'700'}
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          mask={mask}
          onFocus={onFocus}
          textContentType={textContentType}
          bgColor={bgColor}
          required={required}
          maxLength={maxLength}
          onBlur={onBlur}
        />
      )}
      {actionElement === 'selector' && (
        <PickerSelector
          externalTexRef={externalTexRef}
          placeholder={placeholder}
          variant={'standar'}
          textColor={textColor}
          label={label}
          value={value}
          bgColor={bgColor}
          onValueChange={onChangeText}
          onUpArrow={handleFocusPrevious}
          onDownArrow={handleFocusNext}
          pickerData={data}
          onFocus={onFocus}
          required={required}
          onBlur={onBlur}
        />
      )}
      {actionElement === 'datePicker' && (
        <CardLink onPress={onChangeText}>
          <CustomTextInput
            externalTexRef={externalTexRef}
            textColor={'black'}
            fontWeight={'700'}
            label={label}
            placeholder={placeholder}
            value={getFormattedDate(value)}
            bgColor={bgColor}
            onFocus={() => {
              Keyboard.dismiss();
              onChangeText();
              onFocus();
            }}
            required={required}
          />
          <Open
            fill={'red'}
            style={{position: 'absolute', top: '43%', right: '5%'}}
          />
        </CardLink>
      )}
      {actionElement === 'read-only' && (
        <CardLink>
          <CustomTextInput
            externalTexRef={externalTexRef}
            textColor={'black'}
            fontWeight={'700'}
            label={label}
            placeholder={'Phone Number'}
            value={value}
            bgColor={'gray'}
            onFocus={() => {
              Keyboard.dismiss();
              onFocus();
            }}
            required={required}
          />
        </CardLink>
      )}
      {isError && <CustomText>{errorMessage}</CustomText>}
    </CustomView>
  );
};

export default ToggleableInputSelector;
