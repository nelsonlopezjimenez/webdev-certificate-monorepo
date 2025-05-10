# Chapter 01

## item 
Exercise_1.1.js
<pre>
4 + 10
14

console.log("Laurence");
Laurence
undefined
</pre>

## item 
Exercise_1.2.html
<pre>
&lt;!DOCTYPE html>
&lt;html>
 
&lt;head>
  &lt;title>Tester&lt;/title>
&lt;/head>
 
&lt;body>
  &lt;script>
    console.log("hello world");
  &lt;/script>
&lt;/body>
 
&lt;/html>
</pre>

## item 
Exercise_1.3.html
<pre>
&lt;!DOCTYPE html>
&lt;html>
 
&lt;head>
  &lt;title>Tester&lt;/title>
&lt;/head>
 
&lt;body>
  &lt;script src="app.js">&lt;/script>
&lt;/body>
 
&lt;/html>
</pre>

## item 
Exercise_1.4.js
<pre>
let a = 10; // assign a value of 10 to variable a
console.log(a); // This will output 10 into the console
/*
This is a multi-line 
Comment
*/

</pre>

## item 
Project_1.html
<pre>
&lt;!DOCTYPE html>
&lt;html>
  &lt;head>
    &lt;title>JS Tester&lt;/title>
  &lt;/head>
  &lt;body>
    &lt;script src="myJS.js">&lt;/script>
  &lt;/body>
&lt;/html>

</pre>

## item 
all.md
<pre>
</pre>

## item 
app.js
<pre>
alert("Saying hi from a different file!");
</pre>

## item 
myJS.js
<pre>
// console.log("Laurence");
/*
This is my comment
Laurence Svekis
*/
</pre>

## Chapter 01 Code Samples
ch1_alert.js
<pre>
//alert("Saying hi from a different file!");
prompt("Hi! How are you?");</pre>

## item 
ch1_popup1_hithere.html
<pre>
&lt;html>
  &lt;script type="text/javascript">
    alert("Hi there!");
  &lt;/script>
&lt;/html></pre>

## item 
ch1_popup2_prompt.html
<pre>
&lt;html>
  &lt;script type="text/javascript" src="ch1_alert.js">&lt;/script>
&lt;/html></pre>

## item 
ch1_welcome_new_scared.js
<pre>
let status = "new";
let scared = true;
if (status === "new") {
  console.log("Welcome to JavaScript!");
  if (scared) {
    console.log("Don't worry you will be fine!");
  } else {
    console.log("You're brave! You are going to do great!");
  }
} else {
  console.log("Welcome back, I new you'd like it!");
}

</pre>

# Chapter 02
## item Chapter 02
Exercise_2.1.js
<pre>
let str1 = 'Laurence'; 
let str2 = "Svekis"; 
let val1 = undefined;
let val2 = null;
let myNum = 1000;


console.log(typeof(str1));
console.log(typeof(str2));
console.log(typeof(val1));
console.log(typeof(val2));
console.log(typeof(myNum));

</pre>

## item 
Exercise_2.2.js
<pre>
const myName = "Maaike";
const myAge = 29;
const coder = true;
const message = "Hello, my name is " + myName + ", I am " + myAge+" years old and I can code JavaScript: " + coder + "."; 
console.log(message);
</pre>

## item 
Exercise_2.3.js
<pre>
let a = window.prompt("Value 1?");
let b = window.prompt("Value 2?");
a = Number(a);
b = Number(b);
let hypotenuseVal = ((a * a) + (b * b))**0.5;
console.log(hypotenuseVal);
</pre>

## item 
Exercise_2.4.js
<pre>
let a = 4;
let b = 11;
let c = 21;
a = a + b;
a = a / c;
c = c % b;
console.log(a, b, c);
</pre>

## item 
Project_1.js
<pre>
//Convert miles to kilometers. 
//1 mile equals 1.60934 kilometers.
let myDistanceMiles = 130;
let myDistanceKM = myDistanceMiles * 1.60934;
console.log("The distance of " + myDistanceMiles + " miles is equal to " + myDistanceKM + " kilometers");
</pre>

## item 
Project_2.js
<pre>
//1 inch = 2.54 centimetres.
//2.2046 pounds in a kilo
let inches = 72;
let pounds = 180;
let weight = pounds / 2.2046; // in kilos
let height = inches * 2.54; // height in centimetres
console.log(weight, height);
let bmi = weight/(height/100*height/100);
console.log(bmi);
</pre>

## item 
all.md
<pre>
</pre>

# Chapter 02 Code Samples
## item 

## item 
ch2_boolean_and_comparison.js
<pre>
let bool1 = false;
let bool2 = true;
console.log(typeof bool1)

let str1 = "JavaScript is fun!";
let str2 = "JavaScript is fun!";
console.log("These two strings are the same:", str1 === str2);

let sym1 = Symbol("JavaScript is fun!");
let sym2 = Symbol("JavaScript is fun!");
console.log("These two Symbols are the same:", sym1 === sym2);
</pre>

## item 
ch2_calculations_conversions.js
<pre>
// let nr1 = 2;
// let nr2 = "2";
// console.log(nr1 * nr2);

// let nr1 = 2;
// let nr2 = "2";
// console.log(nr1 + nr2);

// let nrToStr = 6;
// nrToStr = String(nrToStr);
// console.log(nrToStr, typeof nrToStr);

// let strToNr = "12";
// strToNr = Number(strToNr);
// console.log(strToNr, typeof strToNr);

// let strToBool = "any string will return true";
// strToBool = Boolean(strToBool);
// console.log(strToBool, typeof strToBool);

// let nullToNr = null;
// nullToNr = Number(nullToNr);
// console.log("null", nullToNr, typeof nullToNr);

// let strToNr = "";
// strToNr = Number(strToNr);
// console.log("empty string", strToNr, typeof strToNr);

// let strToNr2 = "hello";
// strToNr2 = Number(strToNr2);
// console.log(strToNr2, typeof strToNr2);

// let strToBool = "";
// strToBool = Boolean(strToBool);
// console.log(strToBool, typeof strToBool);

// let strToBool2 = "false";
// strToBool2 = Boolean(strToBool2);
// console.log(strToBool2, typeof strToBool2);

// let nr1 = 2;
// let nr2 = "2";
// console.log(nr1 + Number(nr2));
</pre>

## item 
ch2_strings_and_types.js
<pre>
let str = "Hello, what's your name? Is it \"Mike\"?";
console.log(str);
let str2 = 'Hello, what\'s your name? Is it "Mike"?';
console.log(str2);

let str3 = "New \nline."
let str4 = "I'm containing a backslash: \\!";
console.log(str3);
console.log(str4);

let str = "Hello";
let nr = 7;
let bigNr = 12345678901234n;
let bool = true;
let sym = Symbol("unique");
let undef = undefined;
let unknown = null;

console.log("str", typeof str);
console.log("nr", typeof nr);
console.log("bigNr", typeof bigNr);
console.log("bool", typeof bool);
console.log("sym", typeof sym);
console.log("undef", typeof undef);
console.log("unknown", typeof unknown);
</pre>

## item 
ch2_types_and_operations.js
<pre>
// let nr1 = 12;
// let nr2 = 14;
// let str1 = "Hello ";
// let str2 = "addition";
// let result1 = nr1 + nr2;
// let result2 = str1 + str2;
// console.log(result1, result2);

// let nr1 = 20;
// let nr2 = 4;
// let str1 = "Hi ";
// let nr3 = 3;
// let result1 = nr1 - nr2;
// let result2 = str1 - nr3;
// console.log(result1, result2);

// let nr1 = 15;
// let nr2 = 10;
// let str1 = "Hi";
// let nr3 = 3;
// let result1 = nr1 * nr2;
// let result2 = str1 * nr3;
// console.log(result1, result2);

// let nr1 = 30;
// let nr2 = 5;
// let result1 = nr1 / nr2;
// console.log(result1);

// let nr1 = 2;
// let nr2 = 3;
// let result1 = nr1 ** nr2;
// console.log(result1);

// let nr1 = 10;
// let nr2 = 3;
// let result1 = nr1 % nr2;
// console.log(`${nr1} % ${nr2} = ${result1}`);

// let nr3 = 8;
// let nr4 = 2;
// let result2 = nr3 % nr4;
// console.log(`${nr3} % ${nr4} = ${result2}`);

// let nr5 = 15;
// let nr6 = 4;
// let result3 = nr5 % nr6;
// console.log(`${nr5} % ${nr6} = ${result3}`);

// let nr = 4;
// nr++;
// console.log(nr);

// let nr = 2;
// console.log(nr++);
// console.log(nr);

// let nr = 2;
// console.log(++nr);

let nr1 = 4;
let nr2 = 5;
let nr3 = 2;
console.log(nr1++ + ++nr2 * nr3++);</pre>

## item 
ch2_undefined_null.js
<pre>
let unassigned;
console.log(unassigned);

let terribleThingToDo = undefined;
let lastname;
console.log("Same undefined:", lastname === terribleThingToDo);

let betterOption = null;
console.log("Same null:", lastname === betterOption);

let empty = null;
</pre>

## item 
ch2_variables_basics.js
<pre>
let firstname = "Maria";
firstname = "Jacky";

let nr1 = 12;
var nr2 = 8;
const pi = 3.14159;

// throws a TypeError
const someConstant = 3;
someConstant = 4;
</pre>

## item 
ch2_variables_number.js
<pre>
let intNr = 1;
let decNr = 1.5;
let expNr = 1.4e15;

let bigNr = 90071992547409920n;
// typeError
let result = bigNr + intNr;
</pre>

## item 
ch2_variables_string.js
<pre>
let singleString = 'Hi there!';
let doubleString = "How are you?";

let language = "JavaScript";
let message = `Let's learn ${language}`;
console.log(message);
</pre>


# Chapter 03
## item 
Exercise_3.1.js
<pre>
const myList = ["Milk", "Bread", "Apples"];
console.log(myList.length);
myList[1] = "Bananas";
console.log(myList);
</pre>

## item 
Exercise_3.2.js
<pre>
const myList = [];
myList.push("Milk", "Bread", "Apples");
myList.splice(1, 1, "Bananas", "Eggs");
const removeLast = myList.pop();
console.log(removeLast);
myList.sort();
console.log(myList.indexOf("Milk"));
myList.splice(1, 0, "Carrots", "Lettuce");
const myList2 = ["Juice", "Pop"];
const finalList = myList.concat(myList2, myList2);
console.log(finalList.lastIndexOf("Pop"));
console.log(finalList);
</pre>

## item 
Exercise_3.3.js
<pre>
const myArr = [1, 2, 3];
const bigArr = [myArr, myArr, myArr];
console.log(bigArr[1][1]);
console.log(bigArr[0][1]); 
console.log(bigArr[2][1]);
</pre>

## item 
Exercise_3.4.js
<pre>
const myCar = {
    make: "Toyota",
    model: "Camry",
    tires: 4,
    doors: 4,
    color: "blue",
    forSale: false
};

let propColor = "color";
myCar[propColor] = "red";
propColor = "forSale";
myCar[propColor] = true;
console.log(myCar.make + " " + myCar.model);
console.log(myCar.forSale);
</pre>

## item 
Exercise_3.5.js
<pre>
const people = {friends:[]};
const friend1 = {first: "Laurence", last: "Svekis", id: 1};
const friend2 = {first: "Jane", last: "Doe", id: 2};
const friend3 = {first: "John", last: "Doe", id: 3};
people.friends.push(friend1, friend2, friend3);
console.log(people);
</pre>

## item 
Project_1.js
<pre>
theList.pop(); 
theList.shift(); 
theList.unshift("FIRST"); 
theList[3] = "hello World"; 
theList[2] = "MIDDLE"; 
theList.push("LAST"); 
console.log(theList);
</pre>

## item 
Project_2.js
<pre>
const inventory = [];
const item3 = {
    name: "computer",
    model: "imac",
    cost: 1000,
    qty: 3
}
const item2 = {
    name: "phone",
    model: "android",
    cost: 500,
    qty: 11
}
const item1 = {
    name: "tablet",
    model: "ipad",
    cost: 650,
    qty: 1
}
inventory.push(item1, item2, item3);
console.log(inventory);
console.log(inventory[2].qty);
</pre>




# Chapter 03 Code Samples


## item 
ch3_arrays.js
<pre>
arr1 = new Array("purple", "green", "yellow");
arr2 = ["black", "orange", "pink"];

arr3 = new Array(10);
arr4 = [10];

console.log(arr3);
console.log(arr4);

cars = ["Toyota", "Renault", "Volkswagen"];
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[2]);
console.log(cars[3]);
console.log(cars[-1]);

cars[0] = "Tesla";
console.log(cars[0]);

cars[3] = "Kia";
cars[-1] = "Fiat";
console.log(cars[3]);
console.log(cars[-1]);

colors = ["black", "orange", "pink"]
booleans = [true, false, false, true];
emptyArray = [];

console.log("Length of colors:", colors.length);
console.log("Length of booleans:", booleans.length);
console.log("Length of emtpy array:", emptyArray.length);

lastElement = colors[colors.length - 1];
console.log(lastElement);

numbers = [12, 24, 36];
numbers[-1] = 0;
numbers[5] = 48;
console.log(numbers.length);

console.log("numbers", numbers);

favoriteFruits = ["grapefruit", "orange", "lemon"];
favoriteFruits.push("tangerine");

let lengthOfFavoriteFruits = favoriteFruits.push("lime");
console.log(lengthOfFavoriteFruits);
console.log(favoriteFruits);

let arrOfShapes = ["circle", "triangle", "rectangle", "pentagon"];
arrOfShapes.splice(2, 0, "square", "trapezoid");
console.log(arrOfShapes);

let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
let arr7 = arr5.concat(arr6);
console.log(arr7);

let arr8 = arr7.concat(7, 8, 9);
console.log(arr8);

arr8.pop();
console.log(arr8);

arr8.shift();
console.log(arr8);

arr8.splice(1, 3);
console.log(arr8);

delete arr8[0];
console.log(arr8); 

let findValue = arr8.find(() => e === 6);
let findValue2 = arr8.find(() => e === 8);
console.log(findValue, findValue2);

let findIndex = arr8.indexOf(6);
let findIndex2 = arr8.indexOf(10);
let findIndex3 = arr8.indexOf(6, 2);
console.log(findIndex, findIndex2, findIndex3);

let animals = ["dog", "horse", "cat", "platypus", "dog"]
let lastDog = animals.lastIndexOf("dog");
console.log(lastDog);


let names = ["James", "Alicia", "Fatiha", "Maria", "Bert"];
names.sort();

let ages = [18, 72, 33, 56, 40];
ages.sort();

console.log(names);
console.log(ages);

names.reverse();
console.log(names);

console.log(typeof arr1);
</pre>

## item 
ch3_objects.js
<pre>
let dog = { dogName: "JavaScript", 
            weight: 2.4, 
            color: "brown", 
            breed: "chihuahua", 
            age: 3, 
            burglarBiter: true 
          };

let dogColor1 = dog["color"];
let dogColor2 = dog.color;


dog["color"] = "blue";
dog.weight = 2.3;

let company = { companyName: "Healthy Candy",
                activity: "food manufacturing",
                address: {
                  street: "2nd street",
                  number: "123",
                  zipcode: "33116",
                  city: "Miami",
                  state: "Florida"
                },
                yearOfEstablishment: 2021 
              };

company.address.zipcode = "33117";
company["address"]["number"] = "100";

console.log(company);

let company2 = { companyName: "Healthy Candy",
                activities: ["food manufacturing", "improving kids' health", "manufacturing toys"],
                address: {
                  street: "2nd street",
                  number: "123",
                  zipcode: "33116",
                  city: "Miami",
                  state: "Florida"
                },
                yearOfEstablishment: 2021 
              };

let activity = company2.activities[1];
console.log(activity);

let addresses = [{
    street: "2nd street",
    number: "123",
    zipcode: "33116",
    city: "Miami",
    state: "Florida"
  },
  {
    street: "1st West avenue",
    number: "5",
    zipcode: "75001",
    city: "Addison",
    state: "Texas"
  }];

  let company3 = { companyName: "Healthy Candy",
                    activities: ["food manufacturing", "improving kids' health", "manufacturing toys"],
                    address: [{
                      street: "2nd street",
                      number: "123",
                      zipcode: "33116",
                      city: "Miami",
                      state: "Florida"
                    },
                    {
                      street: "1st West avenue",
                      number: "5",
                      zipcode: "75001",
                      city: "Addison",
                      state: "Texas"
                    }],
                    yearOfEstablishment: 2021 
                  };</pre>


# Chapter 04
# Chapter 05
# Chapter 06
# Chapter 07