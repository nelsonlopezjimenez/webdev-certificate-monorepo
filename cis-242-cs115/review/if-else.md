Let me present the examples directly:

## 📚 **ELSE Statement: Correct Usage vs Common Errors**

### ✅ **CORRECT USAGE**

```javascript
// ✅ CORRECT: Proper if-else if-else chain
function getGradeCorrect(score) {
  let grade;
  
  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';  // ✅ ELSE handles ALL remaining cases
  }
  
  return grade;
}

console.log(getGradeCorrect(95));  // A
console.log(getGradeCorrect(50));  // F ✅ handled by else
console.log(getGradeCorrect(-10)); // F ✅ else catches edge cases
```

---

### ❌ **ERROR 1: MISSING ELSE** (Most Common!)

```javascript
// ❌ ERROR: Missing else - variable may be undefined
function getGradeError1(score) {
  let grade;
  
  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  }
  // ❌ NO ELSE! What happens when score < 60?
  
  return grade;  // Returns undefined! 🐛
}

console.log(getGradeError1(95));  // A ✓ works
console.log(getGradeError1(50));  // undefined ✗ BUG!
```

**Why this is wrong:** When `score < 60`, none of the conditions are true, so `grade` is never assigned a value and remains `undefined`.

---

### ❌ **ERROR 2: MULTIPLE IF (should be ELSE IF)**

```javascript
// ❌ ERROR: Using separate if statements
function getGradeError2(score) {
  let grade = 'F';
  
  if (score >= 90) {
    grade = 'A';
  }
  if (score >= 80) {  // ❌ Should be ELSE IF
    grade = 'B';      // This OVERWRITES 'A'!
  }
  if (score >= 70) {  // ❌ Should be ELSE IF
    grade = 'C';      // This OVERWRITES 'B'!
  }
  if (score >= 60) {  // ❌ Should be ELSE IF
    grade = 'D';      // This OVERWRITES 'C'!
  }
  
  return grade;
}

console.log(getGradeError2(95));  // D ✗ WRONG! Should be A

// What happens with score = 95:
// 1. score >= 90? YES → grade = 'A'
// 2. score >= 80? YES → grade = 'B' (overwrites A!)
// 3. score >= 70? YES → grade = 'C' (overwrites B!)
// 4. score >= 60? YES → grade = 'D' (overwrites C!)
// Final result: D (completely wrong!)
```

**Why this is wrong:** All conditions are checked separately, and later assignments overwrite earlier ones.

---

### ❌ **ERROR 3: WRONG ORDER OF CONDITIONS**

```javascript
// ❌ ERROR: Checking broader conditions first
function getGradeError3(score) {
  let grade;
  
  if (score >= 60) {      // ❌ TOO BROAD! Catches everything >= 60
    grade = 'D';
  } else if (score >= 70) {  // Never reached if score >= 70!
    grade = 'C';
  } else if (score >= 80) {  // Never reached!
    grade = 'B';
  } else if (score >= 90) {  // Never reached!
    grade = 'A';
  } else {
    grade = 'F';
  }
  
  return grade;
}

console.log(getGradeError3(95));  // D ✗ WRONG! Should be A
console.log(getGradeError3(75));  // D ✗ WRONG! Should be C
```

**Why this is wrong:** The first condition `score >= 60` is true for ALL scores above 60, so the else-if chain never checks the other conditions.

**RULE:** Always check from **MOST SPECIFIC** to **LEAST SPECIFIC**!

---

### ❌ **ERROR 4: MISSING ELSE IN VALIDATION**

```javascript
// ❌ ERROR: Missing else for error handling
function withdrawMoney(amount, balance) {
  let result;
  
  if (amount > 0 && amount <= balance) {
    result = 'Withdrawal successful';
  }
  // ❌ What about invalid amounts or insufficient funds?
  
  return result;  // undefined for error cases!
}

console.log(withdrawMoney(50, 100));   // Works ✓
console.log(withdrawMoney(200, 100));  // undefined ✗
console.log(withdrawMoney(-10, 100));  // undefined ✗

// ✅ CORRECT VERSION:
function withdrawMoneyCorrect(amount, balance) {
  let result;
  
  if (amount <= 0) {
    result = 'Error: Invalid amount';
  } else if (amount > balance) {
    result = 'Error: Insufficient funds';
  } else {
    result = 'Withdrawal successful';  // ✅ Valid case
  }
  
  return result;
}
```

---

### 📊 **COMPARISON TABLE**

| Pattern | Behavior | Use Case |
|---------|----------|----------|
| **if-else if-else** | First true condition executes, then stops | ✅ Mutually exclusive conditions |
| **Multiple if** | ALL conditions checked | ❌ Inefficient, overwrites values |
| **Missing else** | Undefined if no condition matches | ❌ Bugs with unexpected inputs |
| **Wrong order** | Broader conditions block specific ones | ❌ Logic errors |

---

### 🎯 **KEY TAKEAWAYS:**

1. ✅ **Always use ELSE** to handle remaining cases
2. ✅ **Use ELSE IF** for mutually exclusive conditions (not separate IFs)
3. ✅ **Order conditions** from MOST SPECIFIC to LEAST SPECIFIC
4. ✅ **ELSE ensures** variables are always assigned a value
5. ✅ **ELSE catches** edge cases and invalid inputs
6. ❌ **Missing ELSE** can lead to undefined variables
7. ❌ **Multiple IFs** check all conditions (inefficient and error-prone)
8. ❌ **Wrong order** prevents specific conditions from ever being reached

The `else` statement is your **safety net** - it ensures ALL possible cases are handled!