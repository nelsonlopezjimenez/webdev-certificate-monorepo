Yes, `structuredClone()` is a **built-in global function** (added 2022, widely supported in all modern browsers and Node 17+):

```javascript
const deep = structuredClone(original);
```

**Limitations:** it can't clone functions, DOM nodes, or objects with prototype chains (class instances lose their class).

**Deep cloning options, ranked by recommendation:**

**Built-in:**
- `structuredClone()` — best general choice, handles nested objects, arrays, Maps, Sets, Dates, RegExps
- `JSON.parse(JSON.stringify(obj))` — the old hack. Loses `undefined`, functions, Dates (become strings), `Infinity`, `NaN`. Still commonly seen in legacy code

**Libraries:**
- **Lodash** `_.cloneDeep()` — the long-standing go-to before `structuredClone` existed. Handles more edge cases like class instances
- **Ramda** `R.clone()` — similar deep clone, functional style
- **rfdc** (Really Fast Deep Clone) — a small focused library, fastest benchmarked option if performance is critical

**For your students:** teach `structuredClone()` as the default. Mention `JSON.parse(JSON.stringify())` so they recognize it in the wild, and point to Lodash only if they hit edge cases `structuredClone` can't handle (functions in objects, class instances).