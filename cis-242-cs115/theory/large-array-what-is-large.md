There's no magic number — it depends on the environment and what you're doing. But rough practical thresholds:

**Shallow primitives** (strings, numbers): you likely won't notice a difference until **~10,000+ elements**. Modern engines handle array copying very efficiently.

**Arrays of objects with nested objects** — this is where it gets nuanced:

The spread/slice approach only does a **shallow copy**. The objects inside aren't cloned, they're the same references:

```javascript
const arr = [{ a: { deep: 1 } }, { b: 2 }];
const newArr = [...arr.slice(0, 1), { c: 3 }, ...arr.slice(2)];

// newArr[0] === arr[0]  → true, same reference
// newArr[0].a === arr[0].a → true, same nested object
```

So the cost of the "immutable" spread approach is really just **creating a new array shell and copying references** — it's not cloning every nested object. That's cheap regardless of object complexity.

**When it actually gets expensive:**

- If you need **deep clones** (`structuredClone()`, JSON parse/stringify) on every operation — then even **1,000+ complex objects** can feel slow
- If you're doing it **in a tight loop** (e.g., modifying one element at a time across thousands of iterations) — the repeated array allocation adds up

**Bottom line for your students:** the "large array" caveat is mostly theoretical for typical web apps. The real reason to choose `splice` over spread isn't usually performance — it's intent. If you're managing a mutable data structure by design (like a game loop's entity list), mutation is the right tool.