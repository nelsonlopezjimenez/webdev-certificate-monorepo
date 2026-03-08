/**
 * Challenge 4: Find Last Match
 * 
 * Concepts:
 * - for loop backwards: efficient for finding LAST occurrence
 * - early return: exit function as soon as we find it
 * - return -1: convention for "not found"
 * 
 * Why backwards?
 * When looking for LAST occurrence, starting from the end
 * means we can return immediately when found (it IS the last one!)
 * 
 * Loop Pattern:
 * for (let i = array.length - 1; i >= 0; i--) {
 *   if (array[i] === target) {
 *     return i; // Found it! This IS the last one
 *   }
 * }
 * return -1; // Not found after checking all
 */

function findLastMatch(letters, target) {

  // === SOLUTION START ===
  // TODO: Write your solution here
  for (let i = letters.length -1; i >= 0; i--){
    if (letters[i] === target){
      return i;
    }
  }
  return -1;
  // === SOLUTION END ===
}
  // === SOLUTION START ===
  // TODO: Write your solution here
  // === SOLUTION END ===