// interactiveRunner.js
/**
 * Run challenges interactively from command line
 * Usage: node interactiveRunner.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findFirstVowel(letters) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (letters[i] === vowels[j]) {
        return letters[i];
      }
    }
  }
  return null;
}

console.log('=== Loop Challenge Tester ===');
console.log('Enter letters separated by spaces (e.g., B C A D E)');
console.log('Type "exit" to quit\n');

function promptUser() {
  rl.question('Enter letters: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }
    
    const letters = input.toUpperCase().split(' ');
    const result = findFirstVowel(letters);
    
    console.log(`Input: [${letters.join(', ')}]`);
    console.log(`First vowel: ${result}\n`);
    
    promptUser(); // Ask again
  });
}

promptUser();