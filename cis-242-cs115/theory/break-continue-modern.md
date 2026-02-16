It's **accepted**, yes — but with nuance. The stance has shifted over time:

**Old school (2000s-2010s):** `break`/`continue` were discouraged because they create hidden control flow, similar to `goto`. The functional programming wave pushed toward `.map()`, `.filter()`, `.find()`, `.some()`, `.every()` instead.

**Current consensus:** use the right tool for the job.

**`break`/`continue` are preferred when:**

```javascript
// Early exit on large data — no functional equivalent is as clean
for (const item of hugeArray) {
  if (item.id === target) {
    result = item;
    break; // stops immediately, no wasted iterations
  }
}

// Skipping items with complex conditions
for (const record of records) {
  if (!record.active || record.flagged) continue;
  // main logic here, less nesting
}
```

**Functional methods are preferred when:**

```javascript
// Transforming data — intent is clearer
const names = users.map(u => u.name);
const active = users.filter(u => u.active);
const found = users.find(u => u.id === target);
```

**Key point for students:** functional methods like `.forEach()` **cannot** use `break`/`continue` — that's a common error:

```javascript
// DOES NOT WORK
users.forEach(u => {
  if (u.id === target) break; // SyntaxError
});
```

This is actually a strong argument **for** `for...of` over `.forEach()` — you get both clean syntax and `break`/`continue` support.

**Bottom line:** `break`/`continue` are fine. What's **not** fine is deep nesting with multiple `break`s and labeled loops — that's where readability dies. If your loop logic is that complex, refactor into a function with early `return` instead.

## Prompt example with both ugly/better versions
**The ugly version — labeled breaks with deep nesting:**

```javascript
function findDiscountedItem(departments) {
  let result = null;

  outer: for (const dept of departments) {
    if (!dept.active) continue outer;
    
    inner: for (const category of dept.categories) {
      if (!category.items) continue inner;
      
      for (const item of category.items) {
        if (item.onSale && item.price < 20) {
          result = {
            department: dept.name,
            category: category.name,
            item: item
          };
          break outer; // jumps out of ALL three loops
        }
      }
    }
  }

  return result;
}
```

Hard to follow — you're mentally tracking which label goes where and what state `result` is in.

**Refactored — small function with early return:**

```javascript
function findDiscountedItem(departments) {
  for (const dept of departments) {
    if (!dept.active) continue;

    const found = findInDepartment(dept);
    if (found) return found;
  }
  return null;
}

function findInDepartment(dept) {
  for (const category of dept.categories) {
    if (!category.items) continue;

    const item = category.items.find(
      item => item.onSale && item.price < 20
    );

    if (item) {
      return {
        department: dept.name,
        category: category.name,
        item
      };
    }
  }
  return null;
}
```

**What improved:**

- `return` replaces all labeled `break`/`continue` — each function has one clear exit concern
- Nesting dropped from 4 levels to 2
- Each function is independently testable
- `continue` in the outer loop is fine — it's simple, single-level, no label needed
- `.find()` replaces the innermost loop since it's a simple search

**Rule of thumb for students:** if you're reaching for a label, extract a function instead.