You're thinking of **stack vs heap** memory, but the reality in JavaScript is a bit different than what you may have read:

**Both literals and `new` allocate on the heap.** Objects and arrays are always heap-allocated in JS regardless of syntax. So this isn't a stack vs heap distinction.

```javascript
// These both live on the heap
const a = [1, 2, 3];
const b = new Array(1, 2, 3);
```

**What's actually different is the overhead:**

`new Array()` / `new Object()` goes through the **constructor function call** — the engine has to look up `Array` in the scope chain, invoke it as a constructor, and set up the prototype. Literals (`[]`, `{}`) are recognized at **parse time** and the engine can optimize them directly.

**The real reasons to prefer literals:**

**1. `new Array()` has a footgun:**
```javascript
new Array(3);    // [empty × 3]  — creates 3 empty slots!
new Array(3, 4); // [3, 4]       — now it's elements??
[3];             // [3]          — always predictable
```

**2. `new Object()` adds nothing, just noise:**
```javascript
new Object();    // {}
({});            // {} — same result, cleaner
```

**3. Security edge case:** `Array` and `Object` are global names that can theoretically be reassigned (in non-strict legacy code). Literals can't be intercepted.

**What you may have read about** was probably referring to **primitives** — that's where stack vs heap actually matters:

```javascript
const s1 = 'hello';       // primitive, can live on the stack
const s2 = new String('hello'); // object wrapper, heap-allocated

s1 === s2;    // false — different types
typeof s1;    // 'string'
typeof s2;    // 'object' ← this surprises students
```

**Bottom line:** use literals always. The performance argument is real but tiny — the stronger reasons are predictability and avoiding the `new Array(n)` trap.