// runChallenge.js
/**
 * Usage: node runChallenge.js <challenge-number> <arguments...>
 * Example: node runChallenge.js 1 B C A D E
 */

// Import all challenge functions
function findFirstVowel(letters) { /* ... */return "findFirstVowel" }
function countConsonants(letters) { /* ... */return "countConsonants" }
function reverseLetters(letters) { /* ... */return "reverseLetters" }
// ... etc

// Map challenge numbers to functions
const challenges = {
  '1': { name: 'findFirstVowel', fn: findFirstVowel },
  '2': { name: 'countConsonants', fn: countConsonants },
  '3': { name: 'reverseLetters', fn: reverseLetters },
  // ... add all 10
};

// Get arguments
const challengeNum = process.argv[2];
const inputArgs = process.argv.slice(3);

// Validate
if (!challengeNum) {
  console.error('Error: Please specify challenge number');
  console.log('Usage: node runChallenge.js <1-10> <arguments...>');
  process.exit(1);
}

const challenge = challenges[challengeNum];

if (!challenge) {
  console.error('Error: Invalid challenge number');
  process.exit(1);
}

// Run challenge
console.log(`Running: ${challenge.name}`);
console.log(`Input: [${inputArgs.join(', ')}]`);

const result = challenge.fn(inputArgs);

console.log(`Result: ${JSON.stringify(result)}`);