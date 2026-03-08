describe('helloWithName', () => {
  it('It should return a string with', () => {
    expect(helloWithName('John')).toEqual('Hello John!');
    expect(helloWithName('Bob')).toEqual('Hello Bob!');
    expect(helloWithName('Amy')).toEqual('Hello Amy!');
  });
});

describe('convertNumToString', () => {
  it('It should return a string from a number', () => {
    expect(convertNumToString(4)).toEqual('4');
    expect(convertNumToString(10)).toEqual('10');
    expect(convertNumToString(900)).toEqual('900');
  });
});

describe('lengthOfString', () => {
  it('It should return a number equal to the length of a string', () => {
    expect(lengthOfString('Hello, World!')).toEqual(13);
    expect(lengthOfString('I Love JavaScript!')).toEqual(18);
    expect(lengthOfString('')).toEqual(0);
  });
});

describe('toUpperCase', () => {
  it('It should return a string lowercased', () => {
    expect(toUpperCase('Hello, World!')).toEqual('HELLO, WORLD!');
    expect(toUpperCase('I Love JavaScript!')).toEqual('I LOVE JAVASCRIPT!');
    expect(toUpperCase('')).toEqual('');
  });
});

describe('toLowerCase', () => {
  it('It should return a string capitalized', () => {
    expect(toLowerCase('Hello, World!')).toEqual('hello, world!');
    expect(toLowerCase('I Love Javascript!')).toEqual('i love javascript!');
    expect(toLowerCase('')).toEqual('');
  });
});

describe('trimString', () => {
  it('It should return a string trimmed', () => {
    expect(trimString(' Hello, World! ')).toEqual('Hello, World!');
    expect(trimString(' I Love JavaScript! ')).toEqual('I Love JavaScript!');
    expect(trimString(' ')).toEqual('');
  });
});

describe('convertStringToNum', () => {
  it('It should return a number', () => {
    expect(convertStringToNum('10')).toEqual(10);
    expect(convertStringToNum('0')).toEqual(0);
    expect(convertStringToNum('5')).toEqual(5);
  });
});

describe('lengthOfArray', () => {
  it('It should return a number equal to the length of the array.', () => {
    expect(lengthOfArray(['10', 5, 'A'])).toEqual(3);
    expect(lengthOfArray(['b'])).toEqual(1);
    expect(lengthOfArray([])).toEqual(0);
  });
});

describe('addToArrayEnd', () => {
  it('It should return a string from a number', () => {
    expect(addToArrayEnd(['10', 5, 'A'], 'B')).toEqual(['10', 5, 'A', 'B']);
    expect(addToArrayEnd(['b'], 'z')).toEqual(['b', 'z']);
    expect(addToArrayEnd([], 1)).toEqual([1]);
  });
});

describe('sortStrArray', () => {
  it('It should return a string from a number', () => {
    expect(sortStrArray(['z', 'b', 'j'])).toEqual(['b', 'j', 'z']);
    expect(sortStrArray(['d', 'g'])).toEqual(['d', 'g']);
    expect(sortStrArray(['a'])).toEqual(['a']);
  });
});
