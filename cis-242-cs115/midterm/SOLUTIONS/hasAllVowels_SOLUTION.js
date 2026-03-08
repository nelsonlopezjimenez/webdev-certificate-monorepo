/**
 * SOLUTION: Has All Vowels
 * 
 * Strategy:
 * 1. Define required vowels (A, E, I, O, U)
 * 2. For each required vowel, check if it exists in letters
 * 3. If any vowel is missing, RETURN false immediately
 * 4. If all checks pass, return true
 * 
 * Early return pattern:
 * - Check requirements one by one
 * - Return false as soon as any fails
 * - Only return true if all pass
 */

function hasAllVowels(letters) {
  const requiredVowels = ['A', 'E', 'I', 'O', 'U'];
  
  // Check each required vowel
  for (let i = 0; i < requiredVowels.length; i++) {
    const vowelToFind = requiredVowels[i];
    
    // Search for this vowel in letters array
    let found = false;
    for (let j = 0; j < letters.length; j++) {
      if (letters[j] === vowelToFind) {
        found = true;
        break; // Found it, no need to keep searching
      }
    }
    
    // If this vowel wasn't found, we can stop checking
    if (!found) {
      // RETURN FALSE - exits entire function
      // No need to check remaining vowels
      return false;
    }
  }
  
  // If we get here, ALL vowels were found
  return true;
}

// Example walkthrough with ['A', 'E', 'I', 'O']:
//
// Check 'A': found at index 0 ✓
// Check 'E': found at index 1 ✓
// Check 'I': found at index 2 ✓
// Check 'O': found at index 3 ✓
// Check 'U': NOT FOUND ✗ → return false

// Example with ['U', 'O', 'I', 'E', 'A']:
//
// Check 'A': found at index 4 ✓
// Check 'E': found at index 3 ✓
// Check 'I': found at index 2 ✓
// Check 'O': found at index 1 ✓
// Check 'U': found at index 0 ✓
// All found → return true

// Why early return is efficient:
function hasAllVowels_inefficient(letters) {
  const requiredVowels = ['A', 'E', 'I', 'O', 'U'];
  let foundCount = 0;
  
  // This checks ALL vowels even if first one is missing
  for (let i = 0; i < requiredVowels.length; i++) {
    let found = false;
    for (let j = 0; j < letters.length; j++) {
      if (letters[j] === requiredVowels[i]) {
        found = true;
        break;
      }
    }
    if (found) {
      foundCount++;
    }
  }
  
  return foundCount === 5;
  // Less efficient - checks all even when answer is already "false"
}

// Alternative using nested helper function:
function hasAllVowels_helper(letters) {
  const requiredVowels = ['A', 'E', 'I', 'O', 'U'];
  
  // Helper function to check if array contains a value
  function contains(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  }
  
  // Check each required vowel
  for (let i = 0; i < requiredVowels.length; i++) {
    if (!contains(letters, requiredVowels[i])) {
      return false; // Missing this vowel
    }
  }
  
  return true; // All present
}
