# Loop Challenges - Daily Practice

Your assignment is to fulfill the requirements of the following functions.

**Focus**: Understanding `for`, `while`, and `do-while` loops with `break`, `continue`, and `return` statements.

**Important**: All challenges use character arrays (letters) to avoid confusing array index with element value.

Good luck!

---

## [findFirstVowel](./findFirstVowel.js)

Update the function named `findFirstVowel`, to accept one parameter: an array of characters. It needs to return the **first vowel** found in the array. If no vowel is found, return `null`.

**Concepts**: `for` loop, `break` statement

**Vowels**: 'A', 'E', 'I', 'O', 'U' (uppercase only for this challenge)

Examples:

```js
findFirstVowel(['B', 'C', 'A', 'D']); // expected return 'A'
findFirstVowel(['X', 'Y', 'Z']); // expected return null
findFirstVowel(['E', 'A', 'I']); // expected return 'E' (first one)
```

---

## [countConsonants](./countConsonants.js)

Update the function named `countConsonants`, to accept one parameter: an array of characters. It needs to return the **count** of consonants (non-vowels) in the array.

**Concepts**: `for` loop, `continue` statement

**Vowels to skip**: 'A', 'E', 'I', 'O', 'U'

Examples:

```js
countConsonants(['B', 'A', 'C', 'D', 'E']); // expected return 3 (B, C, D)
countConsonants(['A', 'E', 'I', 'O', 'U']); // expected return 0 (all vowels)
countConsonants(['X', 'Y', 'Z']); // expected return 3 (all consonants)
```

---

## [reverseLetters](./reverseLetters.js)

Update the function named `reverseLetters`, to accept one parameter: an array of characters. It needs to return a **new array** with the characters in reverse order.

**Concepts**: `for` loop backwards (from end to start)

**Note**: Do NOT use the built-in `.reverse()` method - implement it yourself with a loop!

Examples:

```js
reverseLetters(['A', 'B', 'C']); // expected return ['C', 'B', 'A']
reverseLetters(['X']); // expected return ['X']
reverseLetters(['H', 'E', 'L', 'L', 'O']); // expected return ['O', 'L', 'L', 'E', 'H']
```

---

## [findLastMatch](./findLastMatch.js)

Update the function named `findLastMatch`, to accept two parameters: an array of characters and a target character. It needs to return the **index** of the last occurrence of the target. Return `-1` if not found.

**Concepts**: `for` loop backwards, early `return`

**Why backwards?**: When searching for the LAST occurrence, starting from the end is more efficient - we can return as soon as we find it!

Examples:

```js
findLastMatch(['A', 'B', 'A', 'C'], 'A'); // expected return 2 (last A is at index 2)
findLastMatch(['X', 'Y', 'Z'], 'A'); // expected return -1 (not found)
findLastMatch(['M', 'O', 'M'], 'M'); // expected return 2 (last M)
```

---

## [collectUntilSpace](./collectUntilSpace.js)

Update the function named `collectUntilSpace`, to accept one parameter: an array of characters. It needs to return a **string** of all characters collected **until** a space `' '` is encountered. If no space is found, collect all characters.

**Concepts**: `while` loop, `break` statement

**Note**: Use a `while` loop with an index counter (not `for`)

Examples:

```js
collectUntilSpace(['H', 'I', ' ', 'B', 'Y', 'E']); // expected return 'HI'
collectUntilSpace(['A', 'B', 'C']); // expected return 'ABC' (no space)
collectUntilSpace([' ', 'X']); // expected return '' (space at start)
```

---

## [skipAndCollect](./skipAndCollect.js)

Update the function named `skipAndCollect`, to accept one parameter: an array of characters. It needs to return a **string** containing only consonants (skip all vowels).

**Concepts**: `for` loop, `continue` statement

**Vowels to skip**: 'A', 'E', 'I', 'O', 'U'

Examples:

```js
skipAndCollect(['C', 'A', 'T']); // expected return 'CT' (skipped A)
skipAndCollect(['A', 'E', 'I']); // expected return '' (all vowels)
skipAndCollect(['B', 'O', 'O', 'K']); // expected return 'BK'
```

---

## [hasAllVowels](./hasAllVowels.js)

Update the function named `hasAllVowels`, to accept one parameter: an array of characters. It needs to return `true` if the array contains **all 5 vowels** (A, E, I, O, U), otherwise `false`.

**Concepts**: `for` loop, early `return` on failure

**Required vowels**: Must contain A, E, I, O, U (order doesn't matter)

Examples:

```js
hasAllVowels(['A', 'E', 'I', 'O', 'U']); // expected return true
hasAllVowels(['A', 'E', 'I', 'O']); // expected return false (missing U)
hasAllVowels(['A', 'E', 'I', 'O', 'U', 'X', 'Y']); // expected return true
```

---

## [buildWord](./buildWord.js)

Update the function named `buildWord`, to accept one parameter: an array of characters. It needs to return a **string** built from characters **until** a period `'.'` is found. If no period, collect all characters.

**Concepts**: `while` loop, `break` statement, building strings

**Stop condition**: Stop when you encounter `'.'`

Examples:

```js
buildWord(['H', 'I', '.', 'B', 'Y', 'E']); // expected return 'HI'
buildWord(['W', 'O', 'W']); // expected return 'WOW' (no period)
buildWord(['.', 'X']); // expected return '' (period at start)
```

---

## [findPairIndex](./findPairIndex.js)

Update the function named `findPairIndex`, to accept two parameters: an array of characters and a target character. It needs to return the **index of the first position** where the target appears **twice in a row**. Return `-1` if no pair found.

**Concepts**: `for` loop, comparing current with next element

**Example**: In `['A', 'B', 'B', 'C']`, there's a pair of B's at index 1

Examples:

```js
findPairIndex(['A', 'B', 'B', 'C'], 'B'); // expected return 1 (pair starts at index 1)
findPairIndex(['A', 'A', 'B', 'B'], 'B'); // expected return 2 (B pair at index 2)
findPairIndex(['A', 'B', 'C'], 'A'); // expected return -1 (no pair)
```

---

## [extractCapitals](./extractCapitals.js)

Update the function named `extractCapitals`, to accept one parameter: an array of characters (mixed uppercase and lowercase). It needs to return a **string** containing only the **uppercase** letters.

**Concepts**: `do-while` loop (executes at least once)

**Note**: Use `do-while` to process the array (even if empty, the loop runs once to initialize result)

Examples:

```js
extractCapitals(['A', 'b', 'C', 'd']); // expected return 'AC'
extractCapitals(['a', 'b', 'c']); // expected return '' (no capitals)
extractCapitals(['X', 'Y', 'Z']); // expected return 'XYZ'
```

---

## Key Concepts Summary

### Loop Types:
- **`for` loop**: Best when you know how many iterations (array length)
- **`while` loop**: Best when condition-based (continue until something happens)
- **`do-while` loop**: Like `while`, but guarantees at least one execution

### Control Statements:
- **`break`**: Exit the loop immediately
- **`continue`**: Skip to next iteration
- **`return`**: Exit the entire function (different from `break`!)

### Common Patterns:
- Loop forwards: `for (let i = 0; i < arr.length; i++)`
- Loop backwards: `for (let i = arr.length - 1; i >= 0; i--)`
- While with counter: `let i = 0; while (i < arr.length) { ... i++; }`
- Do-while: `let i = 0; do { ... i++; } while (i < arr.length);`

Remember: Always use meaningful variable names and add comments to explain your logic!
