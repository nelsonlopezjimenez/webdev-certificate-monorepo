`splice` mutates in place, which breaks the immutable pattern. But it's still used because:

**1. It does something no single immutable method does** — remove, insert, or replace elements at a specific index, all in one operation. The immutable alternative is verbose:

```javascript
// splice way (mutates)
arr.splice(2, 1, 'new');

// immutable way
const result = [...arr.slice(0, 2), 'new', ...arr.slice(3)];
```

**2. Performance in hot paths** — `splice` modifies the array in place without allocating a new one. When working with large arrays, that matters.

**3. Legacy and ecosystem** — tons of existing code and libraries depend on it.

**4. There's now an immutable alternative: `toSpliced()`** (ES2023). Same signature, returns a new array:

```javascript
const newArr = arr.toSpliced(2, 1, 'new'); // arr unchanged
```

This follows the same pattern as the other recent immutable additions: `toSorted()`, `toReversed()`, and `with()` (immutable version of bracket assignment).

**Worth telling your students:** prefer `toSpliced()` when you want immutability (especially in React state), fall back to `splice` only when you intentionally need in-place mutation and understand the consequences.