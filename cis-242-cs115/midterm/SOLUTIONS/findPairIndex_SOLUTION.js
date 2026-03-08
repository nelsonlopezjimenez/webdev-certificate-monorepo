/**
 * SOLUTION: Find Pair Index
 * 
 * Strategy:
 * 1. Loop through array
 * 2. At each position, check if current AND next match target
 * 3. If pair found, return current index
 * 4. If no pair found, return -1
 * 
 * Key concept: Comparing adjacent elements
 * Need to check array[i] and array[i+1]
 */

function findPairIndex(letters, target) {
  // Loop through array
  // IMPORTANT: Stop at length-1, not length
  // Why? Because we check array[i+1]
  // If i = length-1, then i+1 = length (out of bounds!)
  for (let i = 0; i < letters.length - 1; i++) {
    // Check if both current AND next match target
    if (letters[i] === target && letters[i + 1] === target) {
      // Found pair! Return index where it starts
      return i;
    }
  }
  
  // No pair found
  return -1;
}

// Example walkthrough with ['A', 'B', 'B', 'C'], target='B':
//
// i=0: letters[0]='A', letters[1]='B'
//      'A'!=='B', so no match, continue
//
// i=1: letters[1]='B', letters[2]='B'
//      Both are 'B'! Match found!
//      return 1
//
// (Never reaches i=2 because already returned)

// Why length-1 is important:
// Array: ['A', 'B', 'C']
// Indices: 0    1    2
// Length: 3
//
// If we looped to i < length:
// i=0: check letters[0] and letters[1] ✓ (both exist)
// i=1: check letters[1] and letters[2] ✓ (both exist)  
// i=2: check letters[2] and letters[3] ✗ (letters[3] undefined!)
//
// With i < length-1:
// i=0: check letters[0] and letters[1] ✓
// i=1: check letters[1] and letters[2] ✓
// i=2: loop stops (2 < 2 is false)

// Example with early return:
function findPairIndex_verbose(letters, target) {
  console.log('Looking for pair of:', target);
  
  for (let i = 0; i < letters.length - 1; i++) {
    const current = letters[i];
    const next = letters[i + 1];
    
    console.log('Index ' + i + ': checking ' + current + ' and ' + next);
    
    if (current === target && next === target) {
      console.log('Found pair at index ' + i + '!');
      return i; // Exit function immediately
    }
  }
  
  console.log('No pair found');
  return -1;
}

// What if we want ALL pairs? (different problem):
function findAllPairIndices(letters, target) {
  const indices = []; // Array to store all pair positions
  
  for (let i = 0; i < letters.length - 1; i++) {
    if (letters[i] === target && letters[i + 1] === target) {
      indices.push(i);
      // Don't return - keep looking for more pairs
    }
  }
  
  return indices;
  // With ['A', 'A', 'B', 'B', 'A', 'A'] and target='A'
  // Returns [0, 4] (two pairs of A)
}

// Edge cases:
// Empty array: [] → return -1 (loop never runs)
// Single element: ['A'] → return -1 (loop never runs, 1-1=0)
// No match: ['A', 'B', 'C'] target='X' → return -1
