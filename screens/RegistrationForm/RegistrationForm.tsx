import React, {useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import {CustomView} from '../../components/CustomView';
import DateSelector from '../../components/DateSelector';
import ToggleableInputSelector from '../../components/ToggleableInputSelector';
import {statesList} from './constants';
import useHandleEvents from './hooks/useHandleEvents';
import useInputsContent from './hooks/useInputsContent';
import useRegister2State from './hooks/useRegister2State';

const RegistrationForm = () => {
  const availableGenders = 'Male,Female,Nonbinary,X,Unknown';
  const scrollViewRef = useRef<ScrollView>(null);
  const {configuration} = useRegister2State(availableGenders, statesList);
  let {
    inputs,
    datePickerState,
    isButtonDisabled,
    userInfo,
    setUserInfo,
    setDatePickerState,
    setIsError,
  } = useInputsContent(configuration);

  const {handleFocus, handleFocusNext, handleFocusPrevious, currentInput} =
    useHandleEvents(inputs, scrollViewRef);
  const isButtonDiable = !isButtonDisabled || onLoading;
  const [dateOnPicker, setDateOnPicker] = useState<Date>(new Date());

  const [inputPositions, setInputPositions] = useState<
    {index: number; position: number}[]
  >([]);

  const handleInputLayout = (event: LayoutChangeEvent, index: number) => {
    setInputPositions([
      ...inputPositions,
      {index: index, position: event?.nativeEvent?.layout?.y},
    ]);
  };
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', height: 1500}}>
        <CustomView style={{width: '90%'}}>
          {(inputs ?? [])?.map(
            (
              {
                placeholder,
                keyboardType,
                ref,
                label,
                value,
                onChangeText,
                actionElement,
                textColor,
                bgColor,
                mask,
                textContentType,
                data,
                scrollPosition: _scrollPosition,
                required,
                maxLength,
                isError,
                onBlur,
                errorMessage,
              },
              index,
            ) => (
              <ToggleableInputSelector
                key={`input_${index}`}
                externalTexRef={ref}
                label={label}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                actionElement={actionElement}
                textColor={textColor ?? ''}
                bgColor={bgColor}
                keyboardType={keyboardType}
                mask={mask}
                onFocus={handleFocus(
                  index,
                  Platform.OS === 'ios'
                    ? inputPositions.find(element => element.index === index)
                        ?.position
                    : (inputPositions.find(element => element.index === index)
                        ?.position ?? 0) + 50,
                )}
                onBlur={onBlur}
                handleFocusNext={handleFocusNext}
                handleFocusPrevious={handleFocusPrevious}
                textContentType={textContentType}
                data={data}
                required={required}
                maxLength={maxLength ?? 0}
                isError={isError}
                errorMessage={errorMessage}
                onLayout={(event: LayoutChangeEvent) =>
                  handleInputLayout(event, index)
                }
              />
            ),
          )}
        </CustomView>
        <DateSelector
          //  locale={userLocale}
          open={!!datePickerState}
          date={dateOnPicker}
          onConfirm={(dob: Date) => {
            setDatePickerState(false);
            setUserInfo({
              ...userInfo,
              dateOfBirth: dob ?? '',
            });
            inputs[4].ref?.current?.focus();
            setDateOnPicker(dob);
          }}
          onCancel={() => {
            setDatePickerState(false);
          }}
        />
      </ScrollView>
      {currentInput?.inputInfo?.actionElement === 'input' && (
        <KeyboardAccessoryNavigation
          nextDisabled={currentInput.nextFocusDisabled}
          previousDisabled={currentInput.previousFocusDisabled}
          nextHidden={currentInput.buttonsHidden}
          previousHidden={currentInput.buttonsHidden}
          onNext={handleFocusNext}
          onPrevious={handleFocusPrevious}
          androidAdjustResize
          doneButtonTitle="Done"
          //  avoidKeyboard
          accessoryStyle={{height: 35}}
        />
      )}
    </>
  );
};

export default RegistrationForm;
