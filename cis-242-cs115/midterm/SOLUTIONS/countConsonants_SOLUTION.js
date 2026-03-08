/**
 * SOLUTION: Count Consonants
 * 
 * Strategy:
 * 1. Initialize counter to 0
 * 2. Loop through all letters
 * 3. If letter is vowel, CONTINUE (skip it)
 * 4. Otherwise, increment counter
 * 5. Return count at end
 */

function countConsonants(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let count = 0; // Counter starts at 0
  
  // Loop through each letter
  for (let i = 0; i < letters.length; i++) {
    const currentLetter = letters[i];
    
    // Check if current letter is a vowel
    let isVowel = false;
    for (let j = 0; j < vowels.length; j++) {
      if (currentLetter === vowels[j]) {
        isVowel = true;
        break; // Found it's a vowel, no need to keep checking
      }
    }
    
    // If it's a vowel, skip to next letter
    if (isVowel) {
      // CONTINUE - skips rest of this iteration
      // Jumps back to top of loop with next i value
      // The count++ below WON'T execute for vowels
      continue;
    }
    
    // This line only executes for consonants
    // (vowels hit 'continue' above and skip this)
    count++; // Increment by 1
  }
  
  // Return final count
  return count;
}

// Alternative without continue (for comparison):
function countConsonants_alternative(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let count = 0;
  
  for (let i = 0; i < letters.length; i++) {
    let isVowel = false;
    for (let j = 0; j < vowels.length; j++) {
      if (letters[i] === vowels[j]) {
        isVowel = true;
        break;
      }
    }
    
    // Instead of continue, use if-else
    if (!isVowel) {
      count++;
    }
  }
  
  return count;
}
