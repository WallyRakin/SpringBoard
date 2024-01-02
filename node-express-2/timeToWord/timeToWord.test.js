// timeToWords.test.js

const timeToWords = require('./timeToWords'); // Adjust the path according to your file structure

describe('timeToWords', () => {
  test('midnight', () => {
    expect(timeToWords("00:00")).toBe('midnight');
  });

  test('twelve twelve am', () => {
    expect(timeToWords("00:12")).toBe('twelve twelve am');
  });

  test('one o\'clock am', () => {
    expect(timeToWords("01:00")).toBe("one o'clock am");
  });

  test('six oh one am', () => {
    expect(timeToWords("06:01")).toBe('six oh one am');
  });

  test('six ten am', () => {
    expect(timeToWords("06:10")).toBe('six ten am');
  });

  test('six eighteen am', () => {
    expect(timeToWords("06:18")).toBe('six eighteen am');
  });

  test('six thirty am', () => {
    expect(timeToWords("06:30")).toBe('six thirty am');
  });

  test('ten thirty four am', () => {
    expect(timeToWords("10:34")).toBe('ten thirty four am');
  });

  test('noon', () => {
    expect(timeToWords("12:00")).toBe('noon');
  });

  test('twelve oh nine pm', () => {
    expect(timeToWords("12:09")).toBe('twelve oh nine pm');
  });

  test('eleven twenty three pm', () => {
    expect(timeToWords("23:23")).toBe('eleven twenty three pm');
  });

  // Add more tests as necessary
});

