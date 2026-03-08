/**
 * SOLUTION: Extract Capitals
 * 
 * Strategy:
 * 1. Initialize result and index
 * 2. Use DO-WHILE loop (runs at least once)
 * 3. Check if character is uppercase
 * 4. Add to result if uppercase
 * 5. Return result
 * 
 * Do-While vs While:
 * - while: checks condition BEFORE running (might not run at all)
 * - do-while: runs code FIRST, then checks (always runs once)
 */

function extractCapitals(chars) {
  let result = ''; // String to build
  let i = 0;       // Index counter
  
  // DO-WHILE LOOP
  // Code inside 'do' block runs FIRST
  // Then condition is checked
  do {
    // Check if we're still in bounds
    if (i < chars.length) {
      const currentChar = chars[i];
      
      // Check if character is uppercase
      // Uppercase letters: 'A' to 'Z' (ASCII 65-90)
      // Lowercase letters: 'a' to 'z' (ASCII 97-122)
      if (currentChar >= 'A' && currentChar <= 'Z') {
        result += currentChar;
      }
      
      i++; // Move to next character
    }
  } while (i < chars.length); // Continue if more characters
  
  return result;
}

// Example walkthrough with ['A', 'b', 'C', 'd']:
//
// First iteration (do block always runs once):
// i=0: chars[0]='A', is uppercase ('A'>='A' and 'A'<='Z'), result='A', i becomes 1
// Check condition: i < chars.length? (1 < 4) yes → continue
//
// i=1: chars[1]='b', is lowercase ('b'>'Z'), skip, i becomes 2
// Check condition: (2 < 4) yes → continue
//
// i=2: chars[2]='C', is uppercase, result='AC', i becomes 3
// Check condition: (3 < 4) yes → continue
//
// i=3: chars[3]='d', is lowercase, skip, i becomes 4
// Check condition: (4 < 4) no → stop
//
// return 'AC'

// Empty array special case:
// i=0: i < chars.length? (0 < 0) no → skip the if block
// While condition: (0 < 0) false → stop
// return '' (empty string)

// Why do-while for this problem?
// The problem says loop must run at least once
// do-while guarantees this
// Even with empty array, the do block executes once
// (but the if condition prevents errors)

// While loop version (for comparison):
function extractCapitals_while(chars) {
  let result = '';
  let i = 0;
  
  // Checks condition BEFORE running
  while (i < chars.length) {
    if (chars[i] >= 'A' && chars[i] <= 'Z') {
      result += chars[i];
    }
    i++;
  }
  
  return result;
  // Functionally same, but doesn't guarantee "at least once"
  // For empty array, while block never runs at all
}

// For loop version (most common/clearest):
function extractCapitals_for(chars) {
  let result = '';
  
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] >= 'A' && chars[i] <= 'Z') {
      result += chars[i];
    }
  }
  
  return result;
  // Usually preferred over do-while for array iteration
}

// Understanding character comparison:
function demonstrateCharComparison() {
  // JavaScript compares characters by ASCII value
  console.log('A' >= 'A'); // true (65 >= 65)
  console.log('Z' <= 'Z'); // true (90 <= 90)
  console.log('M' >= 'A' && 'M' <= 'Z'); // true (uppercase)
  console.log('m' >= 'A' && 'm' <= 'Z'); // false (lowercase, ASCII 109)
  console.log('5' >= 'A' && '5' <= 'Z'); // false (digit, ASCII 53)
  
  // Visual: ASCII values
  // 'A' = 65, 'B' = 66, ... 'Z' = 90
  // 'a' = 97, 'b' = 98, ... 'z' = 122
  // '0' = 48, '1' = 49, ... '9' = 57
}

// When to use do-while:
// 1. Menu systems (show menu at least once)
// 2. Input validation (prompt at least once)
// 3. Game loops (run at least one frame)
// For most array operations, for loop is clearer
