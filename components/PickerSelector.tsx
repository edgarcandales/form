import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Open from '../assets/images/app_down_arrow.svg';
import {CustomView} from './CustomView';
import InputSelector from './InputSelector';
import RNPickerSelect from './RNPickerSelect';

export interface IPickerData {
  label: string;
  value: string;
}

interface IPickerSelectorProps {
  variant?: 'input' | 'button' | 'standar';
  type?: 'outline' | 'solid';
  placeholder?: string;
  pickerData?: IPickerData[];
  onValueChange?: (value?: string) => void;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
  externalTexRef: React.RefObject<HTMLDivElement>;
  onUpArrow: () => void;
  onDownArrow: () => void;
  onFocus: () => void;
  required?: boolean;
  onBlur?: () => void;
}

const PickerSelector: React.FC<IPickerSelectorProps> = ({
  variant = 'input',
  type = 'outline',
  placeholder = 'default',
  pickerData = undefined,
  onValueChange,
  label = '',
  value,
  bgColor,
  externalTexRef,
  onUpArrow,
  onDownArrow,
  onFocus,
  required,
  onBlur = () => {},
}) => {
  return (
    <>
      {variant !== 'standar' ? (
        <>
          <View style={{}}>
            <RNPickerSelect
              onOpen={() => onFocus()}
              ref={externalTexRef}
              onUpArrow={() => onUpArrow()}
              onDownArrow={() => onDownArrow()}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                },
                iconContainer: {
                  top: 16,
                  right: 16,
                },
              }}
              useNativeAndroidPickerStyle={true}
              iconContainer={{paddingRight: 16}}
              textInputProps={{padding: 16}}
              placeholder={placeholder as any}
              onValueChange={
                onValueChange
                  ? onValueChange
                  : newValue => console.log(newValue, 'TODO')
              }
              items={pickerData ?? []}
              onClose={() => onBlur()}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{}}>
            <RNPickerSelect
              onOpen={() => onFocus()}
              onDonePress={() => onBlur()}
              ref={externalTexRef}
              onUpArrow={() => {
                onUpArrow();
                onBlur();
              }}
              onDownArrow={() => {
                onDownArrow();
                onBlur();
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                },
                iconContainer: {
                  top: 16,
                  right: 16,
                },
              }}
              useNativeAndroidPickerStyle={false}
              iconContainer={{paddingRight: 16}}
              textInputProps={{padding: 16}}
              onValueChange={
                onValueChange
                  ? onValueChange
                  : newValue => console.log(newValue, 'TODO')
              }
              items={pickerData ?? []}>
              <CustomView width={1}>
                <InputSelector
                  externalTexRef={externalTexRef}
                  textColor={'black'}
                  fontWeight={'700'}
                  label={label}
                  placeholder={placeholder}
                  value={value}
                  bgColor={'#D3D3D3'}
                  onFocus={() => {
                    Keyboard.dismiss();
                  }}
                  required={required}
                />
                <Open
                  fill={'black'}
                  style={{position: 'absolute', top: '43%', right: '5%'}}
                />
              </CustomView>
            </RNPickerSelect>
          </View>
        </>
      )}
    </>
  );
};

export default PickerSelector;
