/**
 * SOLUTION: Find Last Match
 * 
 * Strategy:
 * 1. Loop BACKWARDS from end to start
 * 2. Check each element for match
 * 3. When match found, RETURN index immediately
 * 4. If no match found after full loop, return -1
 * 
 * Why backwards is efficient:
 * We want the LAST occurrence, so starting from the end
 * means we find it first! No need to check all elements.
 */

function findLastMatch(letters, target) {
  // Loop backwards through array
  // Start at last index, go until 0
  for (let i = letters.length - 1; i >= 0; i--) {
    // Check if current letter matches target
    if (letters[i] === target) {
      // FOUND IT!
      // Since we're going backwards, this IS the last one
      // RETURN exits the entire function
      return i;
    }
    // If not a match, continue to previous letter
  }
  
  // If we get here, we checked all letters
  // and didn't find target
  // Convention: return -1 for "not found"
  return -1;
}

// Alternative: Forward loop (less efficient)
function findLastMatch_forward(letters, target) {
  let lastIndex = -1; // Track last found index
  
  // Loop forwards through all elements
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === target) {
      // Update last found index
      // Don't return yet - keep looking for later ones
      lastIndex = i;
    }
  }
  
  // Return last index found (or -1 if never found)
  return lastIndex;
  
  // Why is backwards better?
  // Backwards: stops as soon as found
  // Forwards: must check ALL elements
}

// Example walkthrough with ['A', 'B', 'A', 'C'], target='A':
//
// Backwards method:
// i=3: letters[3]='C', not 'A', continue
// i=2: letters[2]='A', MATCH! return 2 → DONE
//
// Forward method:
// i=0: letters[0]='A', lastIndex=0
// i=1: letters[1]='B', not 'A'
// i=2: letters[2]='A', lastIndex=2
// i=3: letters[3]='C', not 'A'
// return 2
// (Had to check all 4 elements)
