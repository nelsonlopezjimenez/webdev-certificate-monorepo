**`for...in`** is for objects, **`for...of`** is for iterables (arrays, maps, sets, etc.).

**For plain objects (including nested):** use `for...in` — it's the only one that works directly on object keys.

```js
const data = { a: 1, b: { nested: true }, c: 3 };

for (const key in data) {
  console.log(key, data[key]); // a, b, c
}
```

**But the best practice is actually `Object.entries()` + `for...of`:**

```js
for (const [key, value] of Object.entries(data)) {
  console.log(key, value); // cleaner destructuring, no prototype chain risk
}
```

**Why `Object.entries()` + `for...of` wins:**

- `for...in` walks the **prototype chain** — a classic student bug. You'd need `hasOwnProperty()` checks to be safe.
- `for...of` with `Object.entries/keys/values` gives you own properties only, plus clean destructuring.
- TypeScript types the destructured values better with `Object.entries()`.

**Most common student errors:**

1. Using `for...of` directly on an object → `TypeError: obj is not iterable`
2. Forgetting `hasOwnProperty` with `for...in` and getting inherited props
3. Assuming `for...in` guarantees insertion order (it does for string keys in modern engines, but it's a bad habit to rely on)

**For nested objects** specifically — neither loop recurses automatically. If you need deep iteration, you'll need a recursive function regardless of which loop you choose.


## Prompt
elaborate "walks the prototype chain"

When you use `for...in`, it doesn't just iterate the object's **own** properties — it also iterates any enumerable properties inherited from its prototype chain.

```js
const parent = { role: 'admin' };
const user = Object.create(parent); // user inherits from parent
user.name = 'Nelson';
user.age = 40;

for (const key in user) {
  console.log(key);
}
// name
// age
// role  ← came from parent, probably unexpected
```

This is the prototype chain: `user → parent → Object.prototype`. `for...in` walks **all the way up**.

**The traditional guard:**

```js
for (const key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(key); // only name, age
  }
}
```

**Why `Object.entries()` avoids this entirely:**

```js
for (const [key, val] of Object.entries(user)) {
  console.log(key); // only name, age — own properties by design
}
```

**Where this bites students in practice:** someone adds a method to `Array.prototype` or `Object.prototype` (or a library does it), and suddenly their `for...in` loops pick up unexpected keys. That's why `for...in` on arrays is especially dangerous — you'd get array indices *plus* any added prototype methods as string keys.