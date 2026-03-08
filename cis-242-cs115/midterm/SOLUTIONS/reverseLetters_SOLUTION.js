/**
 * SOLUTION: Reverse Letters
 * 
 * Strategy:
 * 1. Create empty result array
 * 2. Loop BACKWARDS through original array
 * 3. Add each element to result array
 * 4. Return result
 * 
 * Why backwards loop works:
 * Original: ['A', 'B', 'C']
 * Start at index 2 ('C'), add to result → ['C']
 * Then index 1 ('B'), add to result → ['C', 'B']
 * Then index 0 ('A'), add to result → ['C', 'B', 'A']
 */

function reverseLetters(letters) {
  const result = []; // Empty array to store reversed letters
  
  // BACKWARDS FOR LOOP
  // Start: i = last index (letters.length - 1)
  // Condition: keep going while i >= 0
  // Update: decrease i by 1 each time (i--)
  for (let i = letters.length - 1; i >= 0; i--) {
    // Add current letter to end of result
    result.push(letters[i]);
    
    // Example with ['A', 'B', 'C']:
    // i=2: result.push('C') → result is now ['C']
    // i=1: result.push('B') → result is now ['C', 'B']
    // i=0: result.push('A') → result is now ['C', 'B', 'A']
    // i=-1: loop stops (i < 0)
  }
  
  return result;
}

// Alternative: Forward loop but insert at beginning
function reverseLetters_alternative(letters) {
  const result = [];
  
  // Loop forwards
  for (let i = 0; i < letters.length; i++) {
    // Add at position 0 (beginning)
    // This pushes existing elements to the right
    result.unshift(letters[i]);
    
    // Example with ['A', 'B', 'C']:
    // i=0: result.unshift('A') → result is ['A']
    // i=1: result.unshift('B') → result is ['B', 'A']
    // i=2: result.unshift('C') → result is ['C', 'B', 'A']
  }
  
  return result;
}
