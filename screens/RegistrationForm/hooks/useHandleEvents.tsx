import {useState} from 'react';
const useHandleEvents = (inputs: any, scrollViewRef: any) => {
  const [currentInput, setCurrentInput] = useState({
    activeInputIndex: 0,
    nextFocusDisabled: false,
    previousFocusDisabled: false,
    buttonsDisabled: false,
    buttonsHidden: false,
    inputInfo: {
      id: '',
      label: '',
      placeholder: '',
      value: '',
      onChangeText: null,
      actionElement: '',
      textContentType: '',
    },
  });
  const handleFocus = (index: number, scrollPosition: any) => () => {
    scrollViewRef.current.scrollTo({y: scrollPosition, animated: true});
    setCurrentInput({
      ...currentInput,
      nextFocusDisabled: index === inputs.length - 1,
      previousFocusDisabled: index === 0,
      activeInputIndex: index,
      inputInfo: inputs[index],
    });
  };
  const handleFocusNext = () => {
    const {nextFocusDisabled, activeInputIndex} = currentInput;
    if (nextFocusDisabled) {
      return;
    }

    if (
      inputs[activeInputIndex + 1].bgColor &&
      inputs[activeInputIndex + 1].id !== '13'
    ) {
      inputs[activeInputIndex + 2].actionElement === 'selector'
        ? inputs[activeInputIndex + 2]?.ref?.current?.togglePicker()
        : inputs[activeInputIndex + 2]?.ref?.current?.focus();
    } else {
      inputs[activeInputIndex + 1].actionElement === 'selector'
        ? inputs[activeInputIndex + 1]?.ref?.current?.togglePicker()
        : inputs[activeInputIndex + 1]?.ref?.current?.focus();
    }
  };

  const handleFocusPrevious = () => {
    const {previousFocusDisabled, activeInputIndex} = currentInput;
    if (previousFocusDisabled) {
      return;
    }

    if (inputs[activeInputIndex - 1].bgColor) {
      inputs[activeInputIndex - 2].actionElement === 'selector'
        ? inputs[activeInputIndex - 2]?.ref?.current?.togglePicker()
        : inputs[activeInputIndex - 2]?.ref?.current?.focus();
    } else {
      inputs[activeInputIndex - 1].actionElement === 'selector'
        ? inputs[activeInputIndex - 1]?.ref?.current?.togglePicker()
        : inputs[activeInputIndex - 1]?.ref?.current?.focus();
    }
  };

  return {
    handleFocus,
    handleFocusNext,
    handleFocusPrevious,
    currentInput,
  };
};

export default useHandleEvents;
