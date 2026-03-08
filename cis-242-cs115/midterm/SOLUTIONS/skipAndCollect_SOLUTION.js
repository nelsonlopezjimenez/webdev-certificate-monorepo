/**
 * SOLUTION: Skip and Collect
 * 
 * Strategy:
 * 1. Loop through all letters
 * 2. Check if letter is vowel
 * 3. If vowel, CONTINUE (skip adding it)
 * 4. If consonant, add to result
 * 5. Return result string
 * 
 * Continue statement:
 * - Skips rest of current iteration
 * - Jumps to next iteration
 * - Loop keeps running (unlike break)
 */

function skipAndCollect(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let result = ''; // Build result string
  
  // Loop through each letter
  for (let i = 0; i < letters.length; i++) {
    const currentLetter = letters[i];
    
    // Check if current letter is a vowel
    let isVowel = false;
    for (let j = 0; j < vowels.length; j++) {
      if (currentLetter === vowels[j]) {
        isVowel = true;
        break;
      }
    }
    
    // If vowel, skip to next letter
    if (isVowel) {
      // CONTINUE - skip rest of this iteration
      // The result += line below WON'T execute
      // Loop continues with next value of i
      continue;
    }
    
    // This line only executes for consonants
    // (vowels hit continue above and skip this)
    result += currentLetter;
  }
  
  return result;
}

// Example walkthrough with ['C', 'A', 'T']:
//
// i=0: currentLetter='C', not vowel, result='C'
// i=1: currentLetter='A', IS VOWEL, continue → skip adding
// i=2: currentLetter='T', not vowel, result='CT'
// return 'CT'

// Alternative without continue:
function skipAndCollect_alternative(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let result = '';
  
  for (let i = 0; i < letters.length; i++) {
    let isVowel = false;
    for (let j = 0; j < vowels.length; j++) {
      if (letters[i] === vowels[j]) {
        isVowel = true;
        break;
      }
    }
    
    // Only add if NOT vowel
    if (!isVowel) {
      result += letters[i];
    }
  }
  
  return result;
  // Both work! Continue just makes "skip" pattern clearer
}

// Continue vs Break comparison:
function demonstrateContinueVsBreak(letters) {
  console.log('=== With CONTINUE ===');
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === 'A') {
      console.log('Found A at ' + i + ', skipping');
      continue; // Skip rest, go to next i
    }
    console.log('Processing: ' + letters[i]);
  }
  // Processes all letters except A
  
  console.log('\n=== With BREAK ===');
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === 'A') {
      console.log('Found A at ' + i + ', stopping');
      break; // Exit entire loop
    }
    console.log('Processing: ' + letters[i]);
  }
  // Stops completely when A is found
}

// Try: demonstrateContinueVsBreak(['B', 'A', 'C', 'A', 'D']);
