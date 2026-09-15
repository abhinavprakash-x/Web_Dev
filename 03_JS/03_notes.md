# Functions in JS

Used for reusabililty of code, created using function keyword.
can pass arguments.

console.log(functionName); --> function's metadata/reference

Pass default values in a function by
```js
function add(num1, num2, num3=0, num4=0) { return num1 + num2 + num3 + num4; }
add(1, 2); // 3
add(2,3,4); // 9
add(3,3,3,3); // 12
```

## Rest Operator
```js
function add(...num) { console.log(num); }
add(1,2); // [1, 2]
add(1,2,3,4,5,6); // [1, 2, 3, 4, 5, 6]
```

It basically crreates an array and passes all the args as elements of the array.
It looks similar to Spread Operator but it's very different.
Spread is used to convert array into elements, and Rest converts elements into array.


## Function Expressions
```js
add(1,2); // ReferenceError: Cannot access 'add' before initialization
const add = function(num1, num2) { return num1 + num2; }
add(1,2); // 3

addNumbers(1,2,3); // This will work because function declarations are hoisted.
function addNumbers(num1, num2, num3) { return num1 + num2 + num3; }
```
Function expressions are not hoisted, so they can only be called after they are defined.
But function declarations are hoisted, so they can be called before they are defined.

## Arrow Functions
```js
const add = (num1, num2) => { return num1 + num2; }
// If there is only one statement in the function, we can remove the curly braces and return
const add = (num1, num2) => num1 + num2;
```

Even during arr.sort we used arrow functions to sort the array in ascending order.
```js
const arr = [1, 5, 2, 4, 3];
arr.sort((a, b) => a - b); // [1, 2, 3, 4, 5]
```

Return objects from arrow functions by wrapping the object in parentheses.
```js
const getUser = () => ({ name: 'John', age: 30 });
```

## IIFE (Immediately Invoked Function Expression)
```js
(function() {
    console.log('IIFE');
})();
```
Automatically invoked function, used to create a new scope and avoid polluting the global scope.

## Function Callbacks
```js
function greet(name, callback) {
    console.log(`Hello ${name}`);
    callback();
}

greet('John', function() {
    console.log('How are you?');
});
```

Why not just call the function inside greet? Because we want to pass a function as an argument and call it later. This is useful for asynchronous operations, like making API calls or reading files.
Also because we can pass different functions as callbacks to the same function, making it more reusable.

## Hoisting
In JS code runs in two phases, first is the memory allocation phase and second is the execution phase.
In the memory allocation phase, all the variables and functions are hoisted to the top of their scope. This means that they are available for use before they are defined in the code.
In the execution phase, the code is executed line by line. If a variable or function is used before it is defined, it will throw a ReferenceError.

Global Execution Context is created when the JS file is loaded in the browser. It contains the global object (window in browsers) and the this keyword. The global execution context is created first and is always present.
Program Execution Context is created when a function is called. It contains the arguments object, the local variables, and the this keyword. The program execution context is created every time a function is called and is destroyed when the function returns.
After the program execution context is destroyed (when the function returns), the control is returned to the global execution context.

This happens when `var` is used to declare a variable.

When `let` and `const` are used to declare a variable, they are not hoisted. They are in a "temporal dead zone"
from the start of the block until the declaration is encountered. If you try to access them before they are declared, you will get a ReferenceError.
They are allocated in memory during the memory allocation phase, but they are not initialized until the execution phase.
This is why you get a ReferenceError when you try to access them before they are declared.
Functions are hoisted, so they can be called before they are defined. This is because functions are allocated in memory during the memory allocation 
phase and are initialized during the execution phase.
But function expressions are not hoisted, so they can only be called after they are defined. This is because function
expressions are allocated in memory during the memory allocation phase, but they are not initialized until the execution phase.

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing
scope during the compilation phase. This means that you can use variables and functions before they are declared in the code.

## Closure
Scope
1. Global Scope
2. Function Scope
3. Block Scope

`let` and `const` follow all three scopes, while `var` follows only the first two it doesn't follow the block scope.
If the same variable is declared in the multiple scopes, the inner scope variable will shadow the outer scope variable.

You can access function variables from outer scopes by using the function reference.
Closure is a function that remembers the variables from its outer scope even after the outer function has returned.
This is possible because functions in JavaScript are first-class citizens and can be passed around as values.
The function reference is kept in memory, so the inner function can still access the variables from the outer function's scope.
(in the heap memory) even after the outer function has returned (in the call stack memory).

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    let account = {
        deposit: function(amount) {
            balance += amount;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient funds");
            }
        },
        getBalance: function() {
            return balance;
        }
    };

    return account;
}
```

balance is a private variable that can only be accessed by the functions inside the createBankAccount function.
The account object is returned from the createBankAccount function, and it contains references to the deposit, withdraw,
and getBalance functions. These functions can access the balance variable even after the createBankAccount function has returned.

## Higher Order Functions
Functions that take other functions as arguments or return functions as their result are called higher-order functions.