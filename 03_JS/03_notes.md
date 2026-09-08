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