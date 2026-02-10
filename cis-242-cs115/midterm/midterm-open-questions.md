Let me create the files using available tools. I'll present both documents:Let me present the exam and answer key directly:

# 📝 **JavaScript Midterm - Written Response Questions**

## **10 Questions (100 points total)**

---

## **BEGINNER QUESTIONS (5 × 10 pts = 50 pts)**

### **Q1: Variables & Scope (10 pts)**

**Fix this code - find at least 4 errors:**

```javascript
function calculateTotal() {
  const price = 50;
  let quantity = 3;
  price = 60;  // Error
  
  if (quantity > 2) {
    var discount = 0.1;
    const total = price * quantity * (1 - discount);
  }
  
  console.log('Total:', totla);  // Error
  console.log('Discount:', discount);
}

calculatetotal();  // Error
```

---

### **Q2: String Methods (10 pts)**

**Find at least 5 errors:**

```javascript
let username = "  JohnDoe123  ";
let email = "JOHN@EXAMPLE.COM";

let cleanUser = username.Trim();
let lowerUser = cleanUser.toLowercase();
let lowerEmail = email.tolowerCase();
let domain = email.slice(email.indexof('@') + 1);
let isValid = username.include('@');

console.log('User:', lowerUser);
console.log('Valid:', isvalid);
```

---

### **Q3: Functions (10 pts)**

**Find at least 5 errors:**

```javascript
function calculateArea(width height) {
  let area = width * height;
  return area
}

Function greetUser(name) {
  return "Hello, " + name;
}

let result1 = calculateArea(5, 10;
let result2 = greetuser('Alice');
let result3 = calculateArea(3);
```

---

### **Q4: Conditionals (10 pts)**

**Find at least 4 errors:**

```javascript
let age = 25;
let hasLicense = true;

if age >= 18 {
  console.log('Adult');
}

if (age >= 16 && hasLicense = true) {
  console.log('Can drive');
}

let status;
if (age >= 65) {
  status = 'Senior';
} else if (age >= 18) {
  status = 'Adult';
} else if (age >= 13)
  status = 'Teen';
  console.log('Age verified');
else {
  status = 'Child';
}
```

---

### **Q5: Arrays & Loops (10 pts)**

**Find at least 5 errors:**

```javascript
let fruits = ['apple', 'banana', 'orange'];
let numbers = [1, 2, 3, 4, 5];

fruits.push('grape';
let count = fruit.length;

for (let i = 0; i <= numbers.length; i++) {
  console.log('Number:', numbers[i]);
}

let index = fruits.indexOf('banana';
let hasOrange = fruits.include('orange');
```

---

## **MEDIUM QUESTIONS (3 × 10 pts = 30 pts)**

### **Q6: Objects (10 pts)**

**Find at least 6 errors:**

```javascript
let student = {
  name: 'Alice',
  age: 20,
  grade: 'A'
  major: 'Computer Science'
};

student.getInfo = function() {
  return this.name + ' is ' + this.Age + ' years old';
}

console.log(student.getinfo());

if (student.major = 'Computer Science') {
  console.log('CS major');
}

delete student.garde;
```

---

### **Q7: DOM Manipulation (10 pts)**

**HTML provided:**
```html
<div id="container">
  <h1 class="title">Welcome</h1>
  <p id="message">Hello</p>
  <button id="btn">Click</button>
</div>
```

**Find at least 6 errors:**

```javascript
let title = document.getElementByid('title');
let message = document.getElementById('message');
let button = document.getElementByClass('btn');

title.innerText = 'Welcome Back!';
message.textcontent = 'Updated';

button.AddEventListener('click', function() {
  message.classlist.add('highlight');
});

let newPara = document.CreateElement('p');
container.appendchild(newPara);
container.style.backgroundcolor = 'gray';
```

---

### **Q8: Scope & Hoisting (10 pts)**

**Explain what happens and fix 5+ errors:**

```javascript
function processData() {
  console.log('Count:', count);
  
  var count = 0;
  
  for (var i = 0; i < 3; i++) {
    var count = count + 1;
    let multiplier = 2;
  }
  
  console.log('Final:', count);
  console.log('i:', i);
  console.log('Multiplier:', multiplier);
}

procesData();

count = 100;
console.log('Global:', count);
```

---

## **HARD QUESTIONS (2 × 10 pts = 20 pts)**

### **Q9: Closures (10 pts)**

**Find at least 6 errors:**

```javascript
function createCounter(initialValue) {
  let count = intialValue;
  
  return {
    increment: function() {
      count = count + 1;
      return count;
    }
    
    decrement: function() {
      Count = count - 1;
      return count;
    },
    
    getvalue: function() {
      return count;
    }
    
    reset: function() {
      count = initialvalue;
    }
  };
}

let counter1 = createCounter(10);
let counter2 = createcounter(20);

console.log(counter1.getValue());
console.log(counter2.Decrement());
console.log(counter1.count);
```

---

### **Q10: Async/Callbacks (10 pts)**

**Find at least 6 errors and explain async issues:**

```javascript
function fetchData(callback) {
  console.log('Fetching...');
  
  setTimeout(function() {
    let data = {
      id: 1,
      name: 'Product'
      price: 99.99
    };
    callback(data);
  } 1000);
}

function processData(data) {
  console.log('Processing:', data.Name);
}

fetchData(processdata);
console.log('Request sent');

let result;
setTimeout(function() {
  result = 'Loaded';
}, 500);

console.log('Result:', result);
```

---

# 🔑 **ANSWER KEY - Quick Reference**

  <!-- === SOLUTION START === -->

## **Q1 Errors:**
1. Can't reassign `const` → use `let`
2. `totla` → `total`
3. `total` scope issue → declare outside if
4. `calculatetotal` → `calculateTotal`

## **Q2 Errors:**
1. `Trim()` → `trim()`
2. `toLowercase()` → `toLowerCase()`
3. `tolowerCase()` → `toLowerCase()`
4. `indexof()` → `indexOf()`
5. `include()` → `includes()`
6. `isvalid` → `isValid`

## **Q3 Errors:**
1. Missing comma: `(width height)` → `(width, height)`
2. `Function` → `function`
3. Missing `)`: `(5, 10;` → `(5, 10);`
4. `greetuser` → `greetUser`
5. Missing arg: `calculateArea(3)` → needs 2 args

## **Q4 Errors:**
1. Missing parens: `if age` → `if (age >= 18)`
2. `=` → `===` (assignment vs comparison)
3. Missing braces for else if multi-statement
4. Logic flow with console.log placement

## **Q5 Errors:**
1. Missing `)`: `push('grape';`
2. `fruit.length` → `fruits.length`
3. `<=` → `<` (off-by-one)
4. Missing `)`: `indexOf('banana';`
5. `include` → `includes`

## **Q6 Errors:**
1. Missing comma after `grade: 'A'`
2. `this.Age` → `this.age`
3. Missing comma after method
4. `getinfo()` → `getInfo()`
5. `=` → `===` in if condition
6. `garde` → `grade`

## **Q7 Errors:**
1. `getElementByid` → `getElementById`
2. Wrong selector (class vs id)
3. `getElementByClass` → method doesn't exist
4. `textcontent` → `textContent`
5. `AddEventListener` → `addEventListener`
6. `classlist` → `classList`
7. `CreateElement` → `createElement`
8. `appendchild` → `appendChild`
9. `backgroundcolor` → `backgroundColor`

## **Q8 Issues:**
1. Hoisting - `count` is undefined initially
2. Redeclaring with `var` in loop
3. `var i` leaks from loop (use `let`)
4. `multiplier` not accessible (block-scoped)
5. `procesData` → `processData`
6. Implicit global `count = 100`

## **Q9 Errors:**
1. `intialValue` → `initialValue`
2. Missing commas in object
3. `Count` → `count`
4. `getvalue` → `getValue`
5. `initialvalue` → `initialValue`
6. `createcounter` → `createCounter`
7. `Decrement` → `decrement`
8. Can't access `count` directly (closure)

## **Q10 Errors:**
1. Missing comma: `'Product'` → `'Product',`
2. Missing comma: `} 1000)` → `}, 1000)`
3. `data.Name` → `data.name`
4. `processdata` → `processData`
5. Async issue: `result` undefined when logged
6. Need callback for proper async handling

**Grading: 40% finding errors, 30% explaining, 30% corrected code**

This exam tests real debugging skills students will use daily! 🚀
  <!-- === SOLUTION END === -->