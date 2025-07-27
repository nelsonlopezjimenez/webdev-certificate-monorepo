# DEMO build a calculator 

In this demo we'll build a calculator using JavaScript and in particular I'll put a lot of emphasis on the topic of functions.
Since we haven't talked yet about how to get input from the browser, or the command line, our little calculator will be more like a library than an actual app.

We will make the calculator very simple, and we'll rewrite it a few times, to show the various ways we can create it.
A calculator with regular functions.

Here is a simple calculator with regular functions:

```js
function sum(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

function mul(a, b) {
  return a * b
}

function div(a, b) {
  return a / b
}
```
We can call it like this:
```sh
sum(1, 2) //result: 3
div(6, 3) //result: 2
mul(2, 2) //result: 4
```
​
You can also assign the function to a variable:

```js
const sum = function sum(a, b) {
  return a + b
}

const sub = function sub(a, b) {
  return a - b
}

const mul = function mul(a, b) {
  return a * b
}

const div = function div(a, b) {
  return a / b
}
```
and even remove the function name, to create anonymous functions:

```js
const sum = function(a, b) {
  return a + b
}

const sub = function(a, b) {
  return a - b
}

const mul = function(a, b) {
  return a * b
}

const div = function(a, b) {
  return a / b
}
```


Calculator with arrow functions. The same exact calculator can be written using arrow functions in this way:

```js
const sum = (a, b) => {
  return a + b
}

const sub = (a, b) => {
  return a - b
}

const mul = (a, b) => {
  return a * b
}

const div = (a, b) => {
  return a / b
}
```

## What changed?

We assigned arrow functions to a variable, because arrow functions are anonymous - they don't have a name.
But the rest does not change a lot in this example.
Arrow functions allow us to do one nice thing when we have a one-line like in this case: we can return directly by omitting the curly brackets and return:

```js
const sum = (a, b) => a + b

const sub = (a, b) => a - b

const mul = (a, b) => a * b

const div = (a, b) => a / b
```

This syntax is very simple and clean, but you need to remember that we can't add more than one statement - more than one will require curly brackets and a return statement.

### Storing the result
Our functions now do a very small job, and as a side effect our calculator is very simple.

We can create a calculator that remembers the previous state, so we can create a longer set of operations and in the end we can retrieve the result of all our calculations, and clear the state, too.

Here is one way: functions access the variable state from their scope, and they return a value based on that, and based on the parameter they receive:

```js
let state = 0

const sum = a => {
  return state + a
}

const sub = a => {
  return state - a
}

const mul = a => {
  return state * a
}

const div = a => {
  return state / a
}
```
Since we have one parameter, we can omit the parentheses we had around (a, b) before.
Now we can call it using this syntax:
```sh
state = sum(2)
state = sum(10)
state = div(6)
```
​
State will not be updated by the functions, so we must assign the function result to it.
Then we can clear it manually with state = 0, or we can create a function called clear:
```js
const clear = () => {
  state = 0
}
```
In this case, we don't have any parameter, so we must use this **() => {} syntax**.
Updating the state within the functions
There's one change I'd like to make now, because it's easy to forget to update the state, so we can update it within the functions:
```js
let state = 0

const sum = a => state += a
const sub = a => state -= a
const mul = a => state *= a
const div = a => state /= a
const clear = () => state = 0
```

Now we don't have to update the state any time we get a result back from the functions:

```sh
sum(2)
sum(10)
div(6)
```
[from Flavio Copes Bootcamp][https://flaviocopes.com/]