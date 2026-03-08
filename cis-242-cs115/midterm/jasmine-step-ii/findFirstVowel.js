/**
 * Challenge 1: Find First Vowel
 * 
 * Concepts:
 * - for loop: standard iteration through array
 * - break: exit loop when target is found
 * - return: send value back to caller
 * 
 * Loop Pattern:
 * for (let i = 0; i < array.length; i++) {
 *   // Check each element at array[i]
 *   // Use break to exit early when found
 * }
 */

function findFirstVowel(letters) {
  // === SOLUTION START ===
// TODO: Write your solution here

  // Your code here
  let result = "";
  if (letters.length === 0) { return null }
  for (let i = 0; i < letters.length; i++) {
    //console.log(letters[i])
    if ('AEIOU'.includes(letters[i])) {
      result = letters[i];
      break;
    }
    else {
      result = null;
    }
  }
          // === SOLUTION END ===
  return result;
}
