import {getFormattedDate} from '../FunctionUtils';

describe('getFormattedDate', () => {
  it('returns empty string if date is different of date instance', () => {
    expect(getFormattedDate('')).toBe('');
  });

  it('returns the formatted date string for a valid date', () => {
    const date = new Date('2023-06-27');
    expect(getFormattedDate(date)).toBe('06/26/2023');
  });
  it('return null when the date is different of type Date', () => {
    const date = 'asdf';
    expect(getFormattedDate(date)).toBe('');
  });
});
