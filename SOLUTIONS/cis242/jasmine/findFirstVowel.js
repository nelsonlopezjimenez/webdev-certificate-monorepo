//    *** argv.slice(2) -== 
//  **** ['/path/to/exe/node.exe', '/path/to/script.js', 'first', 'second']
let letters = process.argv.slice(2);
function findFirstVowel1(letters) {
  let result = "";
  for (let i = 0; i < letters.length; i++) {
    console.log(letters[i])
    console.log(letters[i] === 'i');
    if ('ia'.includes(letters[i])) {
      console.log(true)
    } else {
      console.log(false);
    }
  }
}
function findFirstVowel(letters) {
  let result = "";
  if (letters.length === 0) { return null }
  
  for (i = 0; i < letters.length; i++) {
    // ************* test includes, break
    console.log(`'AEIOU'.includes('${letters[i]}'): ${'AEIOU'.includes(letters[i])}`);
    if ('AEIOU'.includes(letters[i])) {
      result = letters[i];
      //  ********* break closes the for loop
      // break;
    } else {
      result = null;
    }
  }
  console.log(result);
  return result;
}
findFirstVowel(letters);
// console.log(findFirstVowel(['B', 'C', 'A', 'D']));
// console.log(findFirstVowel(['X', 'Y', 'Z'])); // expected return null
// console.log(findFirstVowel(['E', 'A', 'I']));
