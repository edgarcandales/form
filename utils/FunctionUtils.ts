import {Alert, ColorValue} from 'react-native';
export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

export function formatSSN(value: string) {
  if (!value) {
    return value;
  }
  const ssn = value.replace(/[^\d]/g, '');
  const ssnLength = ssn.length;

  if (ssnLength < 4) {
    return ssn;
  }

  if (ssnLength < 6) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
  }

  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
}

export function dateSlashToDash(str: string): string {
  return [str.split('/')[2], str.split('/')[0], str.split('/')[1]].join('-');
}

export function dateDashToSlash(str: string | null): string | null {
  if (str) {
    return [str.split('-')[1], str.split('-')[2], str.split('-')[0]].join('/');
  }
  return null;
}

export const registerErrorAlert = (
  title: string,
  message: string,
  callback: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: callback,
    },
  ]);
};

export function blurHexCode(color: ColorValue, opacity: number): ColorValue {
  if (typeof color !== 'string') {
    return color;
  }
  if (opacity <= 0 || opacity > 1) {
    return color;
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color;
  }
  const hex = color.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const opacityLevel = opacity;

  const rgba = `rgba(${r}, ${g}, ${b}, ${opacityLevel})`;

  const rgbaWithDeformation = `${rgba}`;
  return rgbaWithDeformation;
}

export function getFormattedDate(date: Date | string) {
  if (!date) {
    return '';
  }
  if (!(date instanceof Date)) {
    return '';
  }

  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [month, day, year].join('/');
}
