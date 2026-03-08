/**
 * Challenge 9: Find Pair Index
 * 
 * Concepts:
 * - for loop: check each position
 * - comparing current with next: array[i] vs array[i+1]
 * - boundary check: make sure i+1 exists!
 * - early return: return index as soon as pair found
 * 
 * Comparing Adjacent Elements:
 * for (let i = 0; i < array.length - 1; i++) {
 *   // Why length - 1?
 *   // Because we check array[i+1]
 *   // If i = length-1, then i+1 = length (out of bounds!)
 *   
 *   if (array[i] === target && array[i+1] === target) {
 *     return i; // Found pair starting at i
 *   }
 * }
 * return -1; // No pair found
 * 
 * Example: ['A', 'B', 'B', 'C']
 * i=0: array[0]='A', array[1]='B' - no match
 * i=1: array[1]='B', array[2]='B' - MATCH! return 1
 */

function findPairIndex(letters, target) {
  // Your code here
}
