No. **Plain objects are not iterable**, regardless of nesting. They don't implement the `Symbol.iterator` protocol.

```javascript
const obj = { a: { nested: true }, b: 2 };

for (const item of obj) { }
// TypeError: obj is not iterable
```

**What IS iterable:** arrays, strings, Maps, Sets, TypedArrays, NodeLists, generators — anything with `Symbol.iterator`.

**To iterate objects, you convert them first:**

```javascript
// These return iterable arrays from the object
Object.keys(obj)      // ['a', 'b']
Object.values(obj)    // [{ nested: true }, 2]
Object.entries(obj)   // [['a', { nested: true }], ['b', 2]]
```

**You can make an object iterable** by defining `Symbol.iterator`, but this is rarely worth it for plain data:

```javascript
const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const entries = Object.entries(this);
    let i = 0;
    return {
      next() {
        return i < entries.length
          ? { value: entries[i++], done: false }
          : { done: true };
      }
    };
  }
};

for (const [k, v] of obj) {
  console.log(k, v); // works now
}
```

**For your students:** if they need to iterate object data, `Object.entries()` + `for...of` is the idiomatic pattern. If they find themselves wanting objects to be iterable, they probably should be using a `Map` instead — Maps are iterable by default and preserve insertion order by spec.

## isObject
```js
function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}
```