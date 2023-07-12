const {getFormattedDate} = require('../FunctionUtils');

describe('getFormattedDate', () => {
  it('returns null if date is falsy', () => {
    expect(getFormattedDate(null)).toBeNull();
    expect(getFormattedDate(undefined)).toBeNull();
    expect(getFormattedDate('')).toBeNull();
    expect(getFormattedDate(false)).toBeNull();
    // Add more cases if needed
  });

  it('returns the formatted date string for a valid date', () => {
    const date = new Date('2023-06-27');
    expect(getFormattedDate(date)).toBe('06/27/2023');
    // Add more assertions for different dates if needed
  });
});
