/**
 * Challenge 5: Collect Until Space
 * 
 * Concepts:
 * - while loop: continue until condition is false
 * - break: exit when space is found
 * - string building: concatenate characters
 * - manual index management: track position yourself
 * 
 * While Loop Pattern:
 * let i = 0;
 * while (i < array.length) {
 *   // Check condition
 *   if (shouldStop) {
 *     break; // Exit loop
 *   }
 *   // Do work
 *   i++; // IMPORTANT: increment counter!
 * }
 * 
 * Difference from for loop:
 * - for: iteration count known/automatic
 * - while: keep going until condition changes
 */

function collectUntilSpace(chars) {
  // === SOLUTION START ===
  // TODO: Write your solution here
  let i = 0;
  let str = "";

  function shouldStop(char){
    return char === ' ' ? true : false;
  }
  while (i < chars.length) {
    // Check condition
    if (shouldStop(chars[i])) {
      break; // Exit loop
    }
    // Do work
    str += chars[i];
    i++; // IMPORTANT: increment counter!
  }
  return str;
  // === SOLUTION END ===
}

// === SOLUTION START ===
// TODO: Write your solution here
// === SOLUTION END ===
