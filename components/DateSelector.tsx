import React from 'react';
import DatePicker from 'react-native-date-picker';

interface DateSelectorProps {
  date: Date;
  onDateChange?: (date: Date) => void;
  fadeToColor?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  mode?: 'datetime' | 'date' | 'time';
  textColor?: string;
  open?: boolean;
  onConfirm?: (dob: Date) => void;
  onCancel?: () => void;
  title?: string | null;
  confirmText?: string;
  cancelText?: string;
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  date,
  onDateChange,
  fadeToColor,
  maximumDate,
  minimumDate,
  mode = 'date',
  textColor,
  open = false,
  onConfirm,
  onCancel,
  title = null,
  confirmText,
  cancelText,
  theme = 'light',
  locale,
}) => {
  return (
    <DatePicker
      date={date}
      onDateChange={onDateChange}
      fadeToColor={fadeToColor}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      mode={mode}
      textColor={textColor}
      open={open}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
      confirmText={confirmText}
      cancelText={cancelText}
      theme={theme}
      modal
      locale={locale}
    />
  );
};

export default DateSelector;
