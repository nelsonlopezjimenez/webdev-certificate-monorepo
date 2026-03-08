/**
 * Jasmine Tests for Loop Challenges
 * 
 * Each test suite (describe block) tests one function
 * Each test (it block) tests specific cases
 * 
 * To run: Open index.html in browser
 * Green = passing, Red = failing
 */

describe('findFirstVowel', () => {
  it('should return the first vowel found in the array', () => {
    expect(findFirstVowel(['B', 'C', 'A', 'D'])).toEqual('A');
    expect(findFirstVowel(['E', 'A', 'I'])).toEqual('E');
    expect(findFirstVowel(['X', 'Y', 'E', 'Z'])).toEqual('E');
  });

  it('should return null if no vowel is found', () => {
    expect(findFirstVowel(['X', 'Y', 'Z'])).toEqual(null);
    expect(findFirstVowel(['B', 'C', 'D'])).toEqual(null);
  });

  it('should handle empty array', () => {
    expect(findFirstVowel([])).toEqual(null);
  });
});

describe('countConsonants', () => {
  it('should count consonants correctly', () => {
    expect(countConsonants(['B', 'A', 'C', 'D', 'E'])).toEqual(3);
    expect(countConsonants(['X', 'Y', 'Z'])).toEqual(3);
    expect(countConsonants(['C', 'A', 'T'])).toEqual(2);
  });

  it('should return 0 when all vowels', () => {
    expect(countConsonants(['A', 'E', 'I', 'O', 'U'])).toEqual(0);
    expect(countConsonants(['A', 'A', 'A'])).toEqual(0);
  });

  it('should handle empty array', () => {
    expect(countConsonants([])).toEqual(0);
  });
});

describe('reverseLetters', () => {
  it('should reverse the array of letters', () => {
    expect(reverseLetters(['A', 'B', 'C'])).toEqual(['C', 'B', 'A']);
    expect(reverseLetters(['H', 'E', 'L', 'L', 'O'])).toEqual(['O', 'L', 'L', 'E', 'H']);
  });

  it('should handle single element', () => {
    expect(reverseLetters(['X'])).toEqual(['X']);
  });

  it('should handle empty array', () => {
    expect(reverseLetters([])).toEqual([]);
  });
});

describe('findLastMatch', () => {
  it('should return the index of the last occurrence', () => {
    expect(findLastMatch(['A', 'B', 'A', 'C'], 'A')).toEqual(2);
    expect(findLastMatch(['M', 'O', 'M'], 'M')).toEqual(2);
    expect(findLastMatch(['X', 'Y', 'Z', 'Y'], 'Y')).toEqual(3);
  });

  it('should return -1 if not found', () => {
    expect(findLastMatch(['X', 'Y', 'Z'], 'A')).toEqual(-1);
    expect(findLastMatch(['B', 'C', 'D'], 'A')).toEqual(-1);
  });

  it('should handle single element', () => {
    expect(findLastMatch(['A'], 'A')).toEqual(0);
    expect(findLastMatch(['A'], 'B')).toEqual(-1);
  });
});

describe('collectUntilSpace', () => {
  it('should collect characters until space', () => {
    expect(collectUntilSpace(['H', 'I', ' ', 'B', 'Y', 'E'])).toEqual('HI');
    expect(collectUntilSpace(['C', 'A', 'T', ' ', 'D', 'O', 'G'])).toEqual('CAT');
  });

  it('should collect all if no space', () => {
    expect(collectUntilSpace(['A', 'B', 'C'])).toEqual('ABC');
    expect(collectUntilSpace(['X', 'Y', 'Z'])).toEqual('XYZ');
  });

  it('should return empty string if space at start', () => {
    expect(collectUntilSpace([' ', 'X'])).toEqual('');
  });

  it('should handle empty array', () => {
    expect(collectUntilSpace([])).toEqual('');
  });
});

describe('skipAndCollect', () => {
  it('should collect only consonants', () => {
    expect(skipAndCollect(['C', 'A', 'T'])).toEqual('CT');
    expect(skipAndCollect(['B', 'O', 'O', 'K'])).toEqual('BK');
    expect(skipAndCollect(['H', 'E', 'L', 'L', 'O'])).toEqual('HLL');
  });

  it('should return empty string for all vowels', () => {
    expect(skipAndCollect(['A', 'E', 'I'])).toEqual('');
    expect(skipAndCollect(['O', 'U'])).toEqual('');
  });

  it('should return all for no vowels', () => {
    expect(skipAndCollect(['X', 'Y', 'Z'])).toEqual('XYZ');
  });

  it('should handle empty array', () => {
    expect(skipAndCollect([])).toEqual('');
  });
});

describe('hasAllVowels', () => {
  it('should return true when all vowels present', () => {
    expect(hasAllVowels(['A', 'E', 'I', 'O', 'U'])).toEqual(true);
    expect(hasAllVowels(['A', 'E', 'I', 'O', 'U', 'X', 'Y'])).toEqual(true);
    expect(hasAllVowels(['U', 'O', 'I', 'E', 'A'])).toEqual(true);
  });

  it('should return false when missing any vowel', () => {
    expect(hasAllVowels(['A', 'E', 'I', 'O'])).toEqual(false);
    expect(hasAllVowels(['A', 'E', 'I'])).toEqual(false);
    expect(hasAllVowels(['X', 'Y', 'Z'])).toEqual(false);
  });

  it('should handle duplicates correctly', () => {
    expect(hasAllVowels(['A', 'A', 'E', 'E', 'I', 'I', 'O', 'O', 'U', 'U'])).toEqual(true);
  });

  it('should handle empty array', () => {
    expect(hasAllVowels([])).toEqual(false);
  });
});

describe('buildWord', () => {
  it('should build word until period', () => {
    expect(buildWord(['H', 'I', '.', 'B', 'Y', 'E'])).toEqual('HI');
    expect(buildWord(['C', 'A', 'T', '.', 'D', 'O', 'G'])).toEqual('CAT');
  });

  it('should collect all if no period', () => {
    expect(buildWord(['W', 'O', 'W'])).toEqual('WOW');
    expect(buildWord(['A', 'B', 'C'])).toEqual('ABC');
  });

  it('should return empty string if period at start', () => {
    expect(buildWord(['.', 'X'])).toEqual('');
  });

  it('should handle empty array', () => {
    expect(buildWord([])).toEqual('');
  });
});

describe('findPairIndex', () => {
  it('should find the index of the first pair', () => {
    expect(findPairIndex(['A', 'B', 'B', 'C'], 'B')).toEqual(1);
    expect(findPairIndex(['A', 'A', 'B', 'B'], 'B')).toEqual(2);
    expect(findPairIndex(['X', 'Y', 'Y', 'Z'], 'Y')).toEqual(1);
  });

  it('should return -1 if no pair found', () => {
    expect(findPairIndex(['A', 'B', 'C'], 'A')).toEqual(-1);
    expect(findPairIndex(['A', 'B', 'A'], 'A')).toEqual(-1);
  });

  it('should find pair at start', () => {
    expect(findPairIndex(['A', 'A', 'B'], 'A')).toEqual(0);
  });

  it('should handle single element', () => {
    expect(findPairIndex(['A'], 'A')).toEqual(-1);
  });

  it('should handle empty array', () => {
    expect(findPairIndex([], 'A')).toEqual(-1);
  });
});

describe('extractCapitals', () => {
  it('should extract only uppercase letters', () => {
    expect(extractCapitals(['A', 'b', 'C', 'd'])).toEqual('AC');
    expect(extractCapitals(['X', 'Y', 'Z'])).toEqual('XYZ');
    expect(extractCapitals(['H', 'e', 'L', 'l', 'O'])).toEqual('HLO');
  });

  it('should return empty string if no capitals', () => {
    expect(extractCapitals(['a', 'b', 'c'])).toEqual('');
    expect(extractCapitals(['x', 'y', 'z'])).toEqual('');
  });

  it('should return all if all capitals', () => {
    expect(extractCapitals(['A', 'B', 'C'])).toEqual('ABC');
  });

  it('should handle empty array', () => {
    expect(extractCapitals([])).toEqual('');
  });
});
