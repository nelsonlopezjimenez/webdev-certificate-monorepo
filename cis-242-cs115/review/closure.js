function outer(param1) {
    let val = 10;
    function inner() {
        console.log(param1 + val + "  line 4");
        return param1 + val;
    }
    return inner;
}

let closure = outer(5);
console.log(closure());

function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

closure = createCounter();
console.log(closure())
console.log(closure())

// outer function returns inner function. The count variable is not accessible from outside createCounter, but the returned function (closure) has access to it

function multiply(param4) {
    return function(param5) {
        return param4 * param5;
    };
}

let closure2 = multiply(2);
let closure3 = multiply(30);

console.log(closure2(3));
console.log(closure3(3));
console.log("=======================");



function multiplyFactory(param6) {
  return (param7) => param6 * param7;
}

const double = multiplyFactory(2);
const triple = multiplyFactory(30);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// without closures, most of modern javascript patterns (callbacks, higher-order functions, module patterns, React hooks) would not work.
// Inner maintains a reference to its outer lexical environment, preserving access to the variables in that env even
// after outer has completed (executed, finished, nonalive)