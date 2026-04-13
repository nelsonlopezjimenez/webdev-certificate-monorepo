Yes — still widely used, still valid. But the answer has nuance.

---

## Current status

`forEach()` is not going away and is not considered bad practice. It is in every codebase you will encounter. However, modern JavaScript gives you better tools for most situations where `forEach()` was the default choice.

---

## When `forEach()` is the right tool

Only when you are running a **side effect** on each item and do not need a result back:

```javascript
// good use — side effect only, no return value needed
items.forEach(item => {
  console.log(item);
  db.save(item);
});
```

---

## When a different method is clearer

```javascript
const nums = [1, 2, 3];

// transforming → use map()
nums.forEach(n => results.push(n * 2));  // forEach — awkward
nums.map(n => n * 2);                    // map — correct

// filtering → use filter()
nums.forEach(n => { if (n > 1) results.push(n); }); // forEach — awkward
nums.filter(n => n > 1);                             // filter — correct

// accumulating → use reduce()
let sum = 0;
nums.forEach(n => sum += n);  // forEach — works but verbose
nums.reduce((acc, n) => acc + n, 0); // reduce — correct
```

---

## The real limitation — cannot break out

```javascript
// forEach has no early exit — runs every item no matter what
nums.forEach(n => {
  if (n === 2) return; // this is NOT a break — just skips current iteration
});

// use for...of when you need to stop early
for (const n of nums) {
  if (n === 2) break;  // actually stops
}
```

---

## Current best practice hierarchy

| Need | Use |
|---|---|
| Transform each item | `map()` |
| Filter items | `filter()` |
| Accumulate a value | `reduce()` |
| Side effects only | `forEach()` |
| Need to break early | `for...of` |
| Index matters + break needed | classic `for` loop |

---

> `forEach()` is like a screwdriver — still useful, still everywhere, but reaching for `map()`, `filter()`, or `for...of` first usually produces cleaner, more expressive code. For your CIS 242 students, teaching `forEach()` first is fine — then showing why the others exist makes the distinction meaningful.