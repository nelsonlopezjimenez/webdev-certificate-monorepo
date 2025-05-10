# CIS 242 JavaScript

## JavaScript from Beginner to Professional
1. By Laurence Svekis | Rob Percival | Ms. Maaike van Putten | Enix Ltd
1. Publication Date: 2021-12-15
1. ISBN: 9781800562523

![alt text](image.png)

## Chapter 03 AI generated
This content covers various aspects of working with arrays and objects in JavaScript. It explains properties and methods related to arrays, such as creation, accessing elements, updating values, and common array methods like push(), pop(), findIndex(), sort(), reverse(), and multidimensional arrays. It also demonstrates how to work with objects in JavaScript, including creating objects, accessing and updating properties, and using variables for property names. Additionally, it explores more advanced cases like objects within objects, arrays within objects, and arrays of objects within other objects.

we can have mixed arrays and arrays can hold any type of variable. The values of the array won't be converted to a single data type or anything like that. JavaScript simply stores all the variables with their own data type and value in the array:

let arr = ["hi there", 5, true];
console.log(typeof arr[0]);
console.log(typeof arr[1]);
console.log(typeof arr[2]);

Copy

Explain
This will output to the console:

string
number
boolean

Copy

Explain
The last array fun fact we will go over here is what happens if you define an array using const. You can change the values of a constant array, but you cannot change the array itself. Here is a piece of code to demonstrate:

const arr = ["hi there"];
arr[0] = "new value";
console.log(arr[0]);
 
arr = ["nope, now you are overwriting the array"];

Copy

Explain
The new value for the first element of the array is going fine, but you cannot assign a new value to the full array. Here is what it will output:

new value
TypeError: Assignment to constant variable.

Copy

Explain
Accessing elements
This beautiful array we just made would become much more powerful if we could access its elements. We can do this by referencing the array's index. This is something we did not specify when we created the array, and we did not need to either. JavaScript assigns an index to every value of the array. The first value is assigned the position of 0, the second 1, the third 2, and so on. If we want to call a specific value based on its position in the array, we can use the name of our array, add square brackets to the end, and put the index we want to access between the square brackets, like this:

cars = ["Toyota", "Renault", "Volkswagen"];
console.log(cars[0]);

Copy

Explain
This log statement will write Toyota to the console because we called for the position 0 of the array, which outputs the first value in the list.

console.log(cars[1]);

Copy

Explain
Calling index position 1 is giving us the second element in the array, which is Renault. This will be logged to the console.

console.log(cars[2]);

Copy

Explain
The third element in our array has index 2, so this one will log Volkswagen. What do you think will happen if we use a negative index or an index that is higher than the number of values we get?

console.log(cars[3]);
console.log(cars[-1]);

Copy

Explain
We didn't assign a value to the negative or non-existent index, so when we ask for it, the value is undefined. As such, the log output will be undefined. JavaScript does not throw an error because of this.

Overwriting elements
The elements in an array can be overwritten. This can be done by accessing a certain element using the index and assigning a new value:

cars[0] = "Tesla";
console.log(cars[0]);

Copy

Explain
The output of this log is Tesla because it has overwritten the old value, Toyota. If we output the whole array:

console.log(cars);

Copy

Explain
It will output the following:

[ 'Tesla', 'Renault', 'Volkswagen' ]

Copy

Explain
What happens if you try to overwrite an element that does not exist?

cars[3] = "Kia";

Copy

Explain
Or even a negative index?

cars[-1] = "Fiat";

Copy

Explain
Let's see what happens when we try to write the values to the console:

console.log(cars[3]);
console.log(cars[-1]);

Copy

Explain
And the output:

Kia
Fiat

Copy

Explain
Ha! They suddenly exist. How is that you may wonder? We will discuss this in the next section. For now, just remember that this is not the right way to add values to the array. We will discuss the right way when we explain arrays in the Array methods section.

Built-in length property
Arrays have a very useful built-in property: length. This will return the number of values that the array has:

colors = ["black", "orange", "pink"]
booleans = [true, false, false, true];
emptyArray = [];
console.log("Length of colors:", colors.length);
console.log("Length of booleans:", booleans.length);
console.log("Length of empty array:", emptyArray.length);

Copy

Explain
The first console.logcall returns 3, indicating that the colors array contains 3 values. The second one returns 4, and the last one is an empty array with a length of 0:

Length of colors: 3 
Length of booleans: 4 
Length of empty array: 0 

Copy

Explain
So, be aware that the length is one higher than the maximum index because the index of the array starts at 0, but when determining the length, we look at the number of elements and there are four separate elements. This is why the maximum index is 3 when the length is 4. Hence, the positional value of the last element in the array will be one fewer than the total number of elements.

Take a moment and try to figure out how you can use the length to access the last element of the array:

lastElement = colors[colors.length - 1];

Copy

Explain
You get the highest index by subtracting 1 from the length because, as you know, arrays are zero-indexed. So, the positional value of the last element in the array will be one fewer than the total number of elements.

So, this might seem pretty straightforward. Remember the non-existent index position we called in the previous section? Let's see what happens in this example:

numbers = [12, 24, 36];
numbers[5] = 48;
console.log(numbers.length);

Copy

Explain
The length of the array is only counting the integer numbers starting from 0 up to the highest filled index. If there are elements in the middle of the sequence that do not have a value, they will still get counted. In this case, the length becomes 6. If we log the array, we can see why:

console.log("numbers", numbers);

Copy

Explain
The output will be as follows:

numbers [ 12, 24, 36, <2 empty items>, 48 ]

Copy

Explain
Because we added an element, 48, at index 5, it also created 2 elements at index positions 3 and 4 containing empty values. For now, let's have a look at array methods and find out the right way to add to an array.
