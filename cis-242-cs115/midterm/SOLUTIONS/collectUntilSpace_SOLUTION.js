/**
 * SOLUTION: Collect Until Space
 * 
 * Strategy:
 * 1. Initialize result string and index counter
 * 2. Use WHILE loop to process characters
 * 3. Check each character - if space, BREAK
 * 4. Otherwise add to result and increment index
 * 5. Return result
 * 
 * While loop vs For loop:
 * - for: Best when iterations known (array.length)
 * - while: Best when stopping condition varies
 */

function collectUntilSpace(chars) {
  let result = ''; // Empty string to build result
  let i = 0;       // Index counter (must manage manually!)
  
  // WHILE LOOP
  // Continues as long as condition is true
  while (i < chars.length) {
    // Check if current character is a space
    if (chars[i] === ' ') {
      // BREAK - exit loop immediately
      // No more iterations happen
      // Jumps to code after while loop
      break;
    }
    
    // Add current character to result
    result = result + chars[i];
    // Could also write: result += chars[i];
    
    // IMPORTANT: Increment index!
    // Forgetting this creates INFINITE LOOP!
    i++;
  }
  
  return result;
}

// Example walkthrough with ['H', 'I', ' ', 'B', 'Y']:
//
// i=0: chars[0]='H', not space, result='H', i becomes 1
// i=1: chars[1]='I', not space, result='HI', i becomes 2
// i=2: chars[2]=' ', IS SPACE, break → exit loop
// return 'HI'

// What happens without break:
function collectUntilSpace_noBreak(chars) {
  let result = '';
  let i = 0;
  
  while (i < chars.length) {
    if (chars[i] === ' ') {
      // No break - just skip adding it
      i++;
      continue; // Skip to next iteration
    }
    
    result += chars[i];
    i++;
  }
  
  return result;
  // This would collect ALL non-space characters
  // With ['H', 'I', ' ', 'B', 'Y'], returns 'HIBY'
  // Not what we want!
}

// For loop version (for comparison):
function collectUntilSpace_forLoop(chars) {
  let result = '';
  
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === ' ') {
      break;
    }
    result += chars[i];
  }
  
  return result;
  // Both work! While loop just makes the condition clearer
}
