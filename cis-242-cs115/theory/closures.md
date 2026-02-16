A closure is a function that **remembers the variables from its outer scope** even after that outer scope has finished executing.

```javascript
function makeCounter() {
  let count = 0; // this variable "lives on" after makeCounter returns

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter(); // makeCounter is done, but count persists
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

`count` should be gone after `makeCounter()` returns — but the inner function holds a reference to it, keeping it alive. That's the closure.

**Why it's so useful in JavaScript specifically:**

**1. Data privacy** — JavaScript has no private fields in regular functions/objects. Closures give you encapsulation. `count` above can't be accessed or tampered with from outside — only through the returned function.

**2. Callbacks everywhere** — JS is event-driven. Every time you write an event handler, a `setTimeout`, a `.then()`, or a `.forEach()`, the callback closes over surrounding variables:

```javascript
function setupButton(label) {
  document.getElementById('btn').addEventListener('click', () => {
    console.log(label); // label is remembered via closure
  });
}
```

**3. Factory functions** — creating specialized functions without classes:

```javascript
function multiply(x) {
  return (y) => x * y;
}

const double = multiply(2);
const triple = multiply(3);
double(5); // 10
triple(5); // 15
```

Without closures, most of modern JavaScript's patterns (callbacks, higher-order functions, module patterns, React hooks) wouldn't work.