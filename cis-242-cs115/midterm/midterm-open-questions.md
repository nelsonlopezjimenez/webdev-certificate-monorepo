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
  // TODO: Write your solution here
  <!-- === SOLUTION END === -->
