// ─── Challenge 1 ─────────────────────────────────────────────
// Return a greeting string: "Hello, <name>!"
(function greet(name = "Ana") {
    console.log(`greet: Hello, ${name}!`)
    return `Hello, ${name}!`
})()

// ─── Challenge 2 ─────────────────────────────────────────────
// Return the type of the value as a string
(function getType(value = "5") {
    console.log(typeof value);
    return typeof value;
})()

// ─── Challenge 3 ─────────────────────────────────────────────
// Convert a string to a number and return it
(function toNumber(str) {
    // your code here
})

// ─── Challenge 4 ─────────────────────────────────────────────
// Return true if even, false if odd
(function isEven(n) {
    // your code here
})

// ─── Challenge 5 ─────────────────────────────────────────────
// Return full name with space between first and last
(function getFullName(first, last) {
    // your code here

})
// ─── Challenge 6 ─────────────────────────────────────────────
// Return full name with space between first and second
(function appendToString(first, second) {
    // your code here
})
// ─── Challenge 7 ─────────────────────────────────────────────
// Return the character in str at position index
(function charAt(str, index) {
    // your code here
})
// ─── Challenge 8 ─────────────────────────────────────────────
// Returns a boolean whether vowels (a, e, i, o, u) and consonants are in alternate
(function isAlt(str) {
    // your code here
})
// ─── Challenge 9 ─────────────────────────────────────────────
// It will accept a string and return a new string with all the vowels removed. You should not consider "y" to be a vowel.
(function removeVowels(str='aeiouPRSTusd') {
    // your code here
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'a' || str[i] === 'A' || str[i] === 'e' || str[i] === 'E' || str[i] === 'i' || str[i] === 'I' || str[i] === 'o' || str[i] === 'O' || str[i] === 'u' || str[i] === 'U') {
            continue
        } else {
            newStr += str[i];
        }
    }
    console.log(`removeVowels: ${str} ===>  ${newStr}`)
    return newStr;
})()
// ─── Challenge 10 ─────────────────────────────────────────────
// Write a (function called removeFromString, which accepts a string, a starting index (number) and a number of characters to remove.
// The (function should return a new string with the characters removed.
(function removeFromString(str, index) {
    // your code here
})
