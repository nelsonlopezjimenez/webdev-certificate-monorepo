# Intro to Jasmine Code Challenges

Your assignment is to fullfil the requirements of the following functions.

Good luck!

## [helloWithName](./helloWithName.js)

Update the function named helloWithName, to accept one parameter, a string. It needs to return a string that says "Hello 'name of person'!", i.e. if name equals "John", it would return "Hello John!".

Examples:

```js
helloWithName('John'); // expected return "Hello John!"
helloWithName('Bob'); // expected return "Hello Bob!"
helloWithName('Amy'); // expected return "Hello Amy!"
```

## [convertNumToString](./convertNumToString.js)

Update the function convertNumToString to accept one parameter, a number. It needs to return a string representation of that number.

Examples:

```js
convertNumToString(4); // expected return "4"
convertNumToString(10); // expected return "10"
convertNumToString(900); // expected return "900"
```

## [lengthOfString](./lengthOfString.js)

Update the function named lengthOfString, to accepts one parameter, a string. It needs to return a number equal to the length of that string.

Examples

```js
lengthOfString('Hello, World!'); // expected return 13
lengthOfString('I Love Javascript!'); // expected return 18
lengthOfString(''); // expected return 0
```

## [toUpperCase](./toUpperCase.js)

Update the function named toUpperCase, to accepts one parameter, a string. It needs to return that string as all capital letters.

Examples

```js
toUpperCase('Hello, World!'); // expected return "HELLO, WORLD!"
toUpperCase('I Love JavaScript!'); // expected return "I LOVE JAVASCRIPT!"
toUpperCase(''); // expected return ""
```

## [toLowerCase](./toLowerCase.js)

Update the function named toLowerCase, to accepts one parameter, a string. It needs to return that string as all lowercase letters.

Examples:

```js
toLowerCase('Hello, World!'); // expected return "hello, world!"
toLowerCase('I Love JavaScript!'); // expected return "i love javascript!"
toLowerCase(''); // expected return ""
```

## [trimString](./trimString.js)

Update the function named trimString, to accepts one parameter, a string. It needs to return that string trimmed of whitespaces.

Examples:

```js
trimString(' Hello, World! '); // expected return "Hello, World!"
trimString(' I Love JavaScript! '); // expected return "I Love JavaScript!"
trimString(' '); // expected return ""
```

## [convertStringToNum](./convertStringToNum.js)

Update the function named convertStringToNum, to accepts one parameter, a string. It needs to return that string as a number.

Examples:

```js
convertStringToNum('10'); // expected return 10
convertStringToNum('0'); // expected return 0
convertStringToNum('5'); // expected return 5
```

## [lengthOfArray](./lengthOfArray.js)

Update the function named lengthOfArray, to accepts one parameter, an array. It needs to return a number that equals the length of that array.

Examples:

```js
lengthOfArray(['10', 5, 'A']); // expected return 3
lengthOfArray(['b']); // expected return 1
lengthOfArray([]); // expected return 0
```

## [addToArrayEnd](./addToArrayEnd.js)

Update the function named addToArrayEnd, to accepts two parameters, an array, and an item. It needs to return the array with the item added to the end.

Examples:

```js
addToArrayEnd(['10', 5, 'A'], 'B'); // expected return ['10', 5, 'A', "B"]
addToArrayEnd(['b'], 'z'); // expected return ['b', 'z']
addToArrayEnd([], 1); // expected return [1]
```

## [sortStrArray](./sortStrArray.js)

Update the function named sortStrArray, to accepts one parameters, an array. It needs to return the array with the elements sorted.

Examples:

```js
sortStrArray(['z', 'b', 'j']); // expected return ['b', 'j', 'z']
sortStrArray(['d', 'g']); // expected return ['d', 'g']
sortStrArray(['a']); // expected return ["a]
```
