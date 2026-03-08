//    *** argv.slice(2) -== 
//  **** ['/path/to/exe/node.exe', '/path/to/script.js', 'first', 'second']

// Get arguments from command line (skip first 2)
const letters = process.argv.slice(2);

console.log('Input letters:', letters);

// Call function
const result = findFirstVowel2(letters);

console.log('First vowel found:', result);

function findFirstVowel(letters) {
  let result = "";
  if (letters.length === 0) { return null }
  
  for (i = 0; i < letters.length; i++) {
    // ************* test includes, break
    console.log(`'AEIOU'.includes('${letters[i]}'): ${'AEIOU'.includes(letters[i])}`);
    if ('AEIOU'.includes(letters[i])) {
      result = letters[i];
      //  ********* break closes the for loop
      // break;
    } else {
      result = null;
    }
  }
  console.log(result);
  return result;
}
findFirstVowel(letters);

function findFirstVowel1(letters) {
  let result = "";
  for (let i = 0; i < letters.length; i++) {
    console.log(letters[i])
    console.log(letters[i] === 'i');
    if ('ia'.includes(letters[i])) {
      console.log(true)
    } else {
      console.log(false);
    }
  }
}
// testChallenge.js
/**
 * Run: node testChallenge.js A B C D E
 * This tests the findFirstVowel function with command-line arguments
 */

// Import your challenge function
function findFirstVowel2(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (letters[i] === vowels[j]) {
        return letters[i];
      }
    }
  }
  
  return null;
}
function findFirstVowel3(letters) {
  console.log('Array length:', letters.length);
  
  // Define vowels to check
  const vowels = 'AEIOU'; // or 'aeiou' for lowercase
  
  for (let i = 0; i < letters.length; i++) {
    const currentLetter = letters[i];
    console.log('Checking:', currentLetter);
    
    // ✅ CORRECT: No quotes around letters[i]
    if (vowels.includes(currentLetter)) {
      console.log('  → Found vowel!');
      return currentLetter; // Return as soon as we find one
    } else {
      console.log('  → Not a vowel');
    }
  }
  
  return null; // No vowel found
}

// Test it
findFirstVowel3(['d', 'g', 'i']);

// **Output:**
// ```
// Array length: 3
// Checking: d
//   → Not a vowel
// Checking: g
//   → Not a vowel
// Checking: i
//   → Not a vowel  ← WHY? Because 'i' is lowercase!

// console.log(findFirstVowel(['B', 'C', 'A', 'D']));
// console.log(findFirstVowel(['X', 'Y', 'Z'])); // expected return null
// console.log(findFirstVowel(['E', 'A', 'I']));
 
// Backwards logic

// ❌ WRONG - checking if single letter contains vowels string
if ('i'.includes('aeiou')) { }  // Always false!

// ✅ CORRECT - checking if vowels string contains the letter
if ('aeiou'.includes('i')) { }  // True!