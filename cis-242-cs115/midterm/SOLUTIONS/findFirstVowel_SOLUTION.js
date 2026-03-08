/**
 * SOLUTION: Find First Vowel
 * 
 * Strategy:
 * 1. Loop through array from start to end
 * 2. Check if each character is a vowel
 * 3. When first vowel found, RETURN it immediately (break)
 * 4. If loop completes without finding vowel, return null
 */

function findFirstVowel(letters) {
  // Define vowels we're looking for
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  
  // Loop through each letter in the array
  // Standard for loop: start at 0, go until end
  for (let i = 0; i < letters.length; i++) {
    // Get current letter
    const currentLetter = letters[i];
    
    // Check if this letter is a vowel
    // We need to check against all vowels
    for (let j = 0; j < vowels.length; j++) {
      if (currentLetter === vowels[j]) {
        // FOUND IT! Return immediately
        // This exits the ENTIRE FUNCTION
        // No more iterations happen
        return currentLetter;
      }
    }
    // If we get here, current letter is not a vowel
    // Continue to next letter
  }
  
  // If we get here, we checked all letters
  // and didn't find any vowel
  return null;
}

// Alternative solution using array method (more advanced):
function findFirstVowel_alternative(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  
  for (let i = 0; i < letters.length; i++) {
    // Check if vowels array includes current letter
    if (vowels.includes(letters[i])) {
      return letters[i];
    }
  }
  
  return null;
}
