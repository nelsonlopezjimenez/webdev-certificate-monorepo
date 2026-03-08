/**
 * Challenge 10: Extract Capitals
 * 
 * Concepts:
 * - do-while loop: runs at least once (even for empty array)
 * - checking uppercase: char >= 'A' && char <= 'Z'
 * - string building: collect matching characters
 * 
 * do-while vs while:
 * - while: checks condition BEFORE running (might never run)
 * - do-while: runs code FIRST, then checks condition
 * 
 * Do-While Pattern:
 * let i = 0;
 * let result = '';
 * do {
 *   // This code runs AT LEAST ONCE
 *   if (i < array.length) {
 *     // Check if uppercase
 *     if (isUppercase) {
 *       result += array[i];
 *     }
 *     i++;
 *   }
 * } while (i < array.length);
 * 
 * Note: With empty array:
 * - Loop body runs once
 * - i=0, i < 0 is false, so no processing happens
 * - Returns empty string
 */

function extractCapitals(chars) {
  // Your code here
}
