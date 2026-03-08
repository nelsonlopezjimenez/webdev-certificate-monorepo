/**
 * SOLUTION: Build Word
 * 
 * Strategy:
 * 1. Initialize result string and index
 * 2. Use WHILE loop to process characters
 * 3. If period found, BREAK
 * 4. Otherwise add character and increment
 * 5. Return result
 * 
 * Similar to collectUntilSpace but stops at period
 */

function buildWord(chars) {
  let result = ''; // String to build
  let i = 0;       // Index counter
  
  // WHILE LOOP - continues until condition false
  while (i < chars.length) {
    // Check if current character is a period
    if (chars[i] === '.') {
      // BREAK - stop building word
      // Exit loop immediately
      break;
    }
    
    // Add current character to result
    result += chars[i];
    
    // CRITICAL: Increment index
    // Without this: INFINITE LOOP!
    i++;
  }
  
  return result;
}

// Example walkthrough with ['H', 'I', '.', 'B', 'Y']:
//
// i=0: chars[0]='H', not period, result='H', i becomes 1
// i=1: chars[1]='I', not period, result='HI', i becomes 2
// i=2: chars[2]='.', IS PERIOD, break → exit loop
// return 'HI'

// What if no period? ['W', 'O', 'W']:
//
// i=0: chars[0]='W', not period, result='W', i becomes 1
// i=1: chars[1]='O', not period, result='WO', i becomes 2
// i=2: chars[2]='W', not period, result='WOW', i becomes 3
// i=3: i < chars.length is false (3 < 3 is false), loop stops
// return 'WOW'

// Infinite loop danger:
function buildWord_infiniteLoop(chars) {
  let result = '';
  let i = 0;
  
  while (i < chars.length) {
    if (chars[i] === '.') {
      break;
    }
    result += chars[i];
    // FORGOT i++ !!! 
    // i stays 0 forever
    // Condition i < chars.length always true
    // Loop never ends!
  }
  
  return result;
}

// For loop version (safer - can't forget to increment):
function buildWord_forLoop(chars) {
  let result = '';
  
  // For loop manages i automatically
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '.') {
      break;
    }
    result += chars[i];
  }
  
  return result;
}

// Do-While version:
function buildWord_doWhile(chars) {
  let result = '';
  let i = 0;
  
  // Empty array special case
  if (chars.length === 0) {
    return '';
  }
  
  do {
    if (chars[i] === '.') {
      break;
    }
    result += chars[i];
    i++;
  } while (i < chars.length);
  
  return result;
  // Do-while runs at least once
  // Not ideal for this problem (need to check if empty)
}
