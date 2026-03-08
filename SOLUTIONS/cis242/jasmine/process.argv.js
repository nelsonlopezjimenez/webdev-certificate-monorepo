// script.js
// process.argv is an array containing:
// [0] = path to node
// [1] = path to script file
// [2+] = your actual arguments

console.log('All arguments:', process.argv);
console.log('Script arguments only:', process.argv.slice(2));

// Example usage
const args = process.argv.slice(2); // Skip first 2 elements

const firstName = args[0];
const lastName = args[1];
const age = args[2];

console.log('First name:', firstName);
console.log('Last name:', lastName);
console.log('Age:', age);