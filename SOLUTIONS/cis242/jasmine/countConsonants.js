/**
 * Challenge 2: Count Consonants
 * 
 * Concepts:
 * - for loop: iterate through all elements
 * - continue: skip vowels, don't count them
 * - counter variable: track how many consonants found
 * 
 * Loop Pattern:
 * for (let i = 0; i < array.length; i++) {
 *   if (isVowel) {
 *     continue; // Skip this iteration
 *   }
 *   // Code here only runs for consonants
 * }
 */
const letters = process.argv.slice(2);

function countConsonants(letters) {
  // === SOLUTION START ===
  // TODO: Write your solution here
  function isVowel(char){
    return 'AEIUO'.includes(char);
  }
  let counter = 0;
  if (letters.length === 0) {return 0}
  for (let i = 0; i < letters.length; i++){
    if (isVowel(letters[i])){
      continue;
    }
    console.log(`isVowel(${letters[i]}: ${isVowel(letters[i])})`)
    counter++;
  }
  console.log(counter)
  return counter;
  // === SOLUTION END ===
}
countConsonants(letters);
  // === SOLUTION START ===
  // TODO: Write your solution here
  // === SOLUTION END ===