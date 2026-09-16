# JavaScript Notes — Part 3

> **Topics:** Functions • Parameters • Rest & Spread • Function Expressions • Arrow Functions • IIFE • Callbacks • Hoisting • Scope • Closures • Higher-Order Functions • Array Iteration • `Set` • `Map`

---

# 1. Functions

A **function** is a reusable block of code designed to perform a particular task.

Instead of writing the same code multiple times:

```js
console.log("Hello, World!");
console.log("Hello, World!");
console.log("Hello, World!");
```

we can put the code inside a function:

```js
function printMessage() {
    console.log("Hello, World!");
}

printMessage();
printMessage();
```

The function can then be called whenever we need it.

---

## Function Syntax

```js
function functionName(parameters) {
    // function body
}
```

Example:

```js
function addNumbers(num1, num2) {
    return num1 + num2;
}
```

Calling the function:

```js
const sum = addNumbers(5, 10);

console.log(sum); // 15
```

### Important terminology

```text
function addNumbers(num1, num2) {
                  ↑
              parameters
}

addNumbers(5, 10);
           ↑
        arguments
```

- **Parameters** are the variables defined in the function declaration.
- **Arguments** are the actual values passed when calling the function.

---

# 2. Return Values

A function can return a value using `return`.

```js
function add(a, b) {
    return a + b;
}

const result = add(10, 20);

console.log(result); // 30
```

`return` does two things:

1. Gives a value back to the caller.
2. Immediately stops execution of that function.

Example:

```js
function test() {
    return 10;

    console.log("Hello"); // Never executed
}
```

---

## Functions Without `return`

If a function does not explicitly return a value, it returns `undefined`.

```js
function printMessage() {
    console.log("Hello");
}

const result = printMessage();

console.log(result); // undefined
```

The `console.log()` inside the function still executes.

So:

```js
console.log(printMessage());
```

produces:

```text
Hello
undefined
```

The `Hello` is printed by the function, while `undefined` is the function's return value.

---

# 3. Functions Are Values

Functions are **first-class values** in JavaScript.

This means a function can be:

- stored in a variable
- passed as an argument
- returned from another function
- stored inside an object or array

Example:

```js
function add(a, b) {
    return a + b;
}

console.log(typeof add); // "function"
```

You can also print the function itself:

```js
console.log(add);
```

This gives you the function object/reference rather than calling it.

Compare:

```js
console.log(add);     // function itself
console.log(add(2, 3)); // result: 5
```

The difference is:

```text
add       → reference to the function
add(...)  → call the function
```

---

# 4. Default Parameters

A parameter can have a default value.

```js
function multiplyNumbers(num1, num2, num3 = 1) {
    return num1 * num2 * num3;
}
```

If `num3` is omitted:

```js
console.log(multiplyNumbers(2, 3));
// 6
```

`num3` uses its default value of `1`.

If it is provided:

```js
console.log(multiplyNumbers(2, 3, 4));
// 24
```

The supplied argument replaces the default.

Another example:

```js
function add(num1, num2, num3 = 0, num4 = 0) {
    return num1 + num2 + num3 + num4;
}

console.log(add(1, 2));       // 3
console.log(add(2, 3, 4));    // 9
console.log(add(3, 3, 3, 3)); // 12
```

---

# 5. Rest Parameters

Sometimes we don't know how many arguments a function will receive.

The **rest parameter** allows a function to collect remaining arguments into an array.

Syntax:

```js
function functionName(...parameter) {
    // ...
}
```

Example:

```js
function add(...numbers) {
    console.log(numbers);
}

add(1, 2);
// [1, 2]

add(1, 2, 3, 4, 5);
// [1, 2, 3, 4, 5]
```

The `...numbers` parameter collects all supplied arguments into an array.

---

## Practical Example

```js
function sumAll(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sumAll(1, 2, 3, 4, 5));
// 15
```

Conceptually:

```text
sumAll(1, 2, 3, 4, 5)

          ↓

numbers = [1, 2, 3, 4, 5]
```

Then the function processes that array.

---

# 6. Rest vs Spread

Rest and spread use the same `...` syntax, but they perform different jobs.

## Rest

**Collects multiple values into one array.**

```js
function printNumbers(...numbers) {
    console.log(numbers);
}

printNumbers(1, 2, 3);
```

```text
1, 2, 3
   ↓
[1, 2, 3]
```

---

## Spread

**Expands an iterable into individual elements.**

```js
const arr = [1, 2, 3];

console.log(...arr);
```

Conceptually:

```text
[1, 2, 3]
   ↓
1  2  3
```

Example:

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];

console.log(combined);
// [1, 2, 3, 4, 5, 6]
```

### Easy way to remember

```text
REST
values → array

SPREAD
array/iterable → individual values
```

The meaning depends on **where** the `...` appears.

---

# 7. Rest with Destructuring

Rest can also be used during destructuring.

```js
const numbers = [10, 20, 30, 40];

const [first, second, ...rest] = numbers;

console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40]
```

Here:

```text
first  → 10
second → 20
rest   → [30, 40]
```

---

# 8. Function Declarations

The traditional way of defining a function is a **function declaration**:

```js
function add(a, b) {
    return a + b;
}
```

Function declarations are hoisted.

Therefore, this works:

```js
console.log(add(2, 3));

function add(a, b) {
    return a + b;
}
```

Output:

```text
5
```

We'll discuss why this works in the hoisting section.

---

# 9. Function Expressions

A function can also be assigned to a variable.

```js
const add = function(a, b) {
    return a + b;
};
```

This is called a **function expression**.

The function is being created as a value and assigned to `add`.

```js
console.log(add(2, 3));
// 5
```

---

## Function Declaration vs Function Expression

### Function declaration

```js
add(2, 3);

function add(a, b) {
    return a + b;
}
```

Works because the function declaration is initialized during the creation of its execution context.

### Function expression with `const`

```js
// add(2, 3); // ReferenceError

const add = function(a, b) {
    return a + b;
};
```

The variable `add` exists in the scope but remains in the **Temporal Dead Zone (TDZ)** until its declaration is evaluated.

Therefore, calling it before initialization causes:

```text
ReferenceError
```

---

# 10. Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

Normal function:

```js
const add = function(a, b) {
    return a + b;
};
```

Arrow function:

```js
const add = (a, b) => {
    return a + b;
};
```

---

## Implicit Return

If an arrow function contains only one expression, you can omit the braces and `return`.

```js
const add = (a, b) => a + b;
```

This is called an **implicit return**.

Example:

```js
const square = num => num * num;

console.log(square(5));
// 25
```

If there is one parameter, parentheses can be omitted:

```js
const square = num => num * num;
```

With multiple parameters, parentheses are required:

```js
const add = (a, b) => a + b;
```

---

# 11. Returning Objects from Arrow Functions

There is an ambiguity when returning an object directly.

This:

```js
const getUser = () => {
    name: "John",
    age: 30
};
```

does **not** mean "return this object."

Use parentheses:

```js
const getUser = () => ({
    name: "John",
    age: 30
});
```

Now the object is implicitly returned.

```js
console.log(getUser());
```

Output:

```js
{
    name: "John",
    age: 30
}
```

---

# 12. Arrow Functions and `this`

One important difference between arrow functions and regular functions is how they handle `this`.

Arrow functions **do not have their own `this`**.

Instead, they capture `this` from their surrounding lexical scope.

Example:

```js
const user = {
    name: "Abhinav",

    greet() {
        const arrow = () => {
            console.log(this.name);
        };

        arrow();
    }
};

user.greet();
// Abhinav
```

This topic becomes especially important when working with objects, event handlers, and classes.

For now, remember:

```text
Regular function → has its own `this` depending on how it is called

Arrow function → inherits `this` from surrounding scope
```

---

# 13. IIFE

IIFE stands for:

**Immediately Invoked Function Expression**

It is a function expression that is executed immediately after being created.

```js
(function() {
    console.log("IIFE");
})();
```

The function is:

1. created
2. immediately called

---

## Why Use an IIFE?

An IIFE creates its own function scope.

For example:

```js
(function() {
    const secret = 42;

    console.log(secret);
})();
```

Outside the IIFE:

```js
// console.log(secret); // ReferenceError
```

Historically, IIFEs were commonly used to avoid polluting the global scope before JavaScript had modern module systems.

Today, **ES modules** are generally preferred for organizing code, but IIFEs are still useful to understand because you will encounter them in older JavaScript code.

---

# 14. Callbacks

Because functions are first-class values, we can pass a function to another function.

A function passed as an argument to another function is called a **callback function**.

Example:

```js
function greet(name, callback) {
    console.log(`Hello ${name}`);
    callback();
}

function sayHello() {
    console.log("How are you?");
}

greet("John", sayHello);
```

Output:

```text
Hello John
How are you?
```

---

## Why Use Callbacks?

The important idea is that the function receiving the callback decides **when and how to use it**.

Example:

```js
function calculate(num1, num2, callback) {
    const result = num1 + num2;

    callback(result);
}

function printResult(result) {
    console.log("The result is:", result);
}

calculate(10, 20, printResult);
```

The same `calculate()` function can accept different callbacks:

```js
calculate(10, 20, printResult);
```

or:

```js
calculate(10, 20, result => {
    console.log(result * 2);
});
```

This makes functions more reusable.

Callbacks are also an important foundation for understanding:

- asynchronous JavaScript
- event handlers
- array methods
- Promises
- APIs

---

# 15. Scope

**Scope** determines where a variable can be accessed.

JavaScript has several important types of scope:

```text
Global Scope
     ↓
Function Scope
     ↓
Block Scope
```

---

## Global Scope

A variable declared at the top level of a script has global/module-level visibility depending on how the script is loaded.

Example:

```js
const globalVar = 30;

function greet() {
    console.log(globalVar);
}

greet();
// 30
```

The function can access the variable from its outer scope.

---

# 16. Function Scope

Variables declared with `var` are function-scoped.

```js
function greet() {
    var message = "Hello";

    console.log(message);
}

greet();
```

Outside the function:

```js
// console.log(message);
// ReferenceError
```

The variable exists only within the function.

---

# 17. Block Scope

A block is code surrounded by `{ }`.

Examples:

```js
if (true) {
    // block
}
```

```js
for (...) {
    // block
}
```

`let` and `const` are block-scoped.

```js
if (true) {
    let blockVar = 50;
    const anotherVar = 60;

    console.log(blockVar);
}

// console.log(blockVar);
// ReferenceError
```

---

# 18. `var` vs `let`/`const` Scope

`var` is function-scoped.

`let` and `const` are block-scoped.

Example:

```js
if (true) {
    let blockVar = 50;
    var functionVar = 60;
}

console.log(functionVar); // 60

// console.log(blockVar);
// ReferenceError
```

This is one reason modern JavaScript generally prefers:

```js
const
```

and

```js
let
```

over:

```js
var
```

---

# 19. Variable Shadowing

A variable in an inner scope can have the same name as a variable in an outer scope.

The inner variable **shadows** the outer variable.

```js
let num = 100;

function outerFunction() {
    let num = 200;

    console.log(num); // 200

    function innerFunction() {
        let num = 300;

        console.log(num); // 300
    }

    innerFunction();
}

console.log(num); // 100
outerFunction();
```

Conceptually:

```text
Global scope
└── num = 100

    outerFunction scope
    └── num = 200

        innerFunction scope
        └── num = 300
```

When JavaScript encounters:

```js
console.log(num);
```

it searches from the current scope outward.

---

# 20. Lexical Scope

JavaScript uses **lexical scoping**.

This means the scope available to a function is determined by **where the function is written**, not where it is called.

Example:

```js
const message = "Hello";

function outer() {
    const message = "Outer";

    function inner() {
        console.log(message);
    }

    inner();
}

outer();
// Outer
```

`inner()` can access variables from the scope where it was defined.

This concept is extremely important for understanding closures.

---

# 21. Hoisting

**Hoisting** is the behavior where declarations are processed before the code in their scope begins executing.

A common simplified model is:

```text
Creation / setup
       ↓
Execution
       ↓
Code runs
```

However, declarations are **not all treated the same way**.

---

# 22. `var` Hoisting

Consider:

```js
console.log(a);

var a = 10;

console.log(a);
```

The first output is:

```text
undefined
```

A useful mental model is:

```js
var a;

console.log(a); // undefined

a = 10;

console.log(a); // 10
```

The declaration is processed before execution, while the assignment happens when execution reaches it.

---

# 23. `let` and `const` Hoisting

A common misconception is:

> "`let` and `const` are not hoisted."

More precisely, their declarations are processed as part of creating the scope, but they are **not initialized and cannot be accessed before their declaration is evaluated**.

This period is called the:

**Temporal Dead Zone (TDZ)**

Example:

```js
// console.log(b);

let b = 20;
```

The commented line would produce:

```text
ReferenceError:
Cannot access 'b' before initialization
```

Same idea applies to `const`:

```js
// console.log(value);

const value = 10;
```

---

# 24. Temporal Dead Zone

Consider:

```js
{
    // TDZ begins

    // console.log(x); // ReferenceError

    let x = 10;

    // TDZ ends

    console.log(x); // 10
}
```

The TDZ extends from the beginning of the relevant scope until the declaration is evaluated.

Therefore:

```text
Scope begins
     ↓
   TDZ
     ↓
let x = 10
     ↓
TDZ ends
     ↓
x can be accessed
```

---

# 25. Function Declaration Hoisting

Function declarations are initialized so that they can be called before their position in the source code.

```js
greet();

function greet() {
    console.log("Hello");
}
```

This works.

This behavior is different from:

```js
const greet = function() {
    console.log("Hello");
};
```

because `greet` is a `const` variable whose initialization happens when execution reaches the declaration.

---

# 26. Hoisting Cheat Sheet

| Declaration | Can access before declaration? | Result |
|---|---|---|
| `var x` | Yes | `undefined` |
| `let x` | No | `ReferenceError` |
| `const x` | No | `ReferenceError` |
| Function declaration | Yes | Function can be called |
| Function expression in `const` | No | `ReferenceError` before initialization |
| Arrow function in `const` | No | `ReferenceError` before initialization |

Remember:

> **Hoisting does not literally mean JavaScript physically moves your source code to the top.**

It is better understood as a consequence of how the JavaScript engine creates and initializes bindings before executing the code.

---

# 27. Execution Context

When JavaScript executes code, it works with **execution contexts**.

The two important types to understand for now are:

```text
Global Execution Context
Function Execution Context
```

---

## Global Execution Context

When a script starts executing, JavaScript creates a global execution context.

It contains information needed to execute top-level code.

In browsers, the global environment is associated with the global object (`window` in classic browser scripts).

---

## Function Execution Context

Whenever a function is called, a new function execution context is created.

Example:

```js
function add(a, b) {
    const result = a + b;

    return result;
}

add(10, 20);
```

When `add()` is called, JavaScript creates a new execution context containing information needed by that invocation, including:

```text
parameters
local variables
scope information
function execution state
```

After the function returns, its execution context is no longer active.

---

# 28. Call Stack

Function calls are managed using the **call stack**.

Example:

```js
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

Conceptually:

```text
third()
second()
first()
global
```

When `third()` finishes:

```text
second()
first()
global
```

Then:

```text
first()
global
```

Finally:

```text
global
```

The call stack follows:

> **Last In, First Out (LIFO)**

This becomes especially important when learning recursion and asynchronous JavaScript.

---

# 29. Closures

A **closure** occurs when a function remembers and can access variables from its lexical outer scope, even after that outer function has finished executing.

This sounds complicated, so start with this example:

```js
function counter() {
    let count = 0;

    function increment() {
        count++;

        return count;
    }

    return increment;
}
```

Now:

```js
const myCounter = counter();

console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3
```

Why does `count` still exist?

Because `increment()` forms a closure over the variable `count`.

---

# 30. Understanding the Counter Closure

When we execute:

```js
const myCounter = counter();
```

`counter()` creates:

```text
count = 0
increment = function
```

Then it returns:

```text
increment
```

So:

```text
myCounter
    ↓
increment()
    ↓
remembers
    ↓
count = 0
```

When we call:

```js
myCounter();
```

the function can still access `count`.

It changes:

```text
0 → 1
```

The next call changes:

```text
1 → 2
```

and so on.

The outer function has returned, but the variable remains reachable through the closure.

---

# 31. Closures and Private Data

Closures can be used to create data that cannot be accessed directly from outside.

Example:

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    const account = {
        deposit(amount) {
            balance += amount;
        },

        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient funds");
            }
        },

        getBalance() {
            return balance;
        }
    };

    return account;
}
```

Create an account:

```js
const myAccount = createBankAccount(1000);
```

Deposit:

```js
myAccount.deposit(500);

console.log(myAccount.getBalance());
// 1500
```

The following does not access the private `balance` variable:

```js
myAccount.balance = 2000;

console.log(myAccount.getBalance());
// 1500
```

Why?

Because:

```text
myAccount.balance
```

would refer to a property on the returned object.

The actual:

```text
balance
```

variable belongs to the lexical environment captured by the closure.

---

# 32. Multiple Closures Have Separate State

Consider:

```js
const myAccount = createBankAccount(1000);
const anotherAccount = createBankAccount(500);
```

Each call creates a separate `balance`.

Conceptually:

```text
myAccount
   ↓
closure A
   ↓
balance = 1000


anotherAccount
   ↓
closure B
   ↓
balance = 500
```

Therefore:

```js
anotherAccount.withdraw(200);

console.log(anotherAccount.getBalance());
// 300

console.log(myAccount.getBalance());
// 1000
```

The two accounts do not share the same `balance`.

---

# 33. Closures Can Return Functions

A function can return another function.

```js
function func1(value) {
    return function func2(value2) {
        return value + value2;
    };
}
```

Now:

```js
const add5 = func1(5);

console.log(add5(10));
// 15

console.log(add5(20));
// 25
```

`add5` remembers:

```text
value = 5
```

So:

```js
add5(10)
```

becomes conceptually:

```text
5 + 10
```

---

# 34. Function Currying — Introduction

This pattern:

```js
func1(6)(10);
```

works because the first function returns another function.

```js
const result = func1(6)(10);

console.log(result);
// 16
```

The first call:

```js
func1(6)
```

returns a function that remembers `6`.

The second call:

```js
(10)
```

passes `10` to that returned function.

This is related to **currying**, a functional-programming technique where a function taking multiple arguments is transformed into a sequence of functions taking one argument at a time.

---

# 35. Higher-Order Functions

A **higher-order function** is a function that:

1. takes one or more functions as arguments, or
2. returns a function.

Example:

```js
function calculate(a, b, callback) {
    const result = a + b;

    callback(result);
}
```

`calculate()` is a higher-order function because it accepts a function as an argument.

Another example:

```js
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}
```

This is also a higher-order function because it returns a function.

---

# 36. `forEach()`

`forEach()` executes a callback once for each element in an array.

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => {
    console.log(number);
});
```

---

## `forEach()` Callback Arguments

The callback can receive:

```text
element
index
array
```

Example:

```js
numbers.forEach((number, index, arr) => {
    console.log(number, index, arr);
});
```

Conceptually:

```text
number → current element
index  → current index
arr    → original array
```

---

## Important

`forEach()` is primarily used when you want to **perform an action for each element**.

It does not create a transformed array.

If you want a new array, consider:

```js
map()
```

---

# 37. `map()`

`map()` creates a **new array** by transforming each element.

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);
// [2, 4, 6, 8, 10]
```

Think:

```text
Original:
[1, 2, 3, 4, 5]

      ↓ map(x => x * 2)

New:
[2, 4, 6, 8, 10]
```

The original array is not changed by `map()` itself.

---

# 38. `filter()`

`filter()` creates a new array containing only elements for which the callback returns a truthy value.

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(
    number => number % 2 === 0
);

console.log(evenNumbers);
// [2, 4]
```

Think:

```text
[1, 2, 3, 4, 5]
       ↓
    condition
       ↓
   [2, 4]
```

---

# 39. `filter()` with Different Data Types

Example:

```js
const arr = [1, 2, 3, "A", "B", 4];

const numbers = arr.filter(
    value => typeof value === "number"
);

console.log(numbers);
// [1, 2, 3, 4]
```

You can also filter strings:

```js
const strings = arr.filter(
    value => typeof value === "string"
);

console.log(strings);
// ["A", "B"]
```

---

# 40. How `filter()` Works Internally

Conceptually, a simplified version of `filter()` could be written as:

```js
function filtering(callback) {
    const filteredArr = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            filteredArr.push(this[i]);
        }
    }

    return filteredArr;
}
```

The important idea is:

```text
for every element
       ↓
call callback
       ↓
callback returns true?
       ↓
yes → add element to result
no  → skip element
```

---

## Important Note About `Array.prototype`

It is technically possible to add methods to:

```js
Array.prototype
```

but you generally **should not add custom methods to built-in prototypes in normal application code**.

For example:

```js
Array.prototype.filtering = function(...) {
    ...
};
```

can cause naming conflicts and unexpected behavior in larger applications or libraries.

Your implementation is useful as a **learning exercise** because it demonstrates how a method like `filter()` can conceptually be implemented.

For real projects, use:

```js
array.filter(...)
```

instead.

---

# 41. `find()`

`find()` returns the **first element** that satisfies a condition.

```js
const numbers = [5, 12, 8, 20];

const result = numbers.find(
    number => number > 10
);

console.log(result);
// 12
```

If nothing matches:

```js
console.log(numbers.find(number => number > 100));
// undefined
```

---

# 42. `findIndex()`

`findIndex()` returns the index of the first matching element.

```js
const numbers = [5, 12, 8, 20];

const index = numbers.findIndex(
    number => number > 10
);

console.log(index);
// 1
```

If no element matches:

```text
-1
```

---

# 43. `some()`

`some()` checks whether **at least one** element satisfies a condition.

```js
const numbers = [1, 3, 5, 8];

console.log(
    numbers.some(number => number % 2 === 0)
);

// true
```

Think:

```text
Does ANY element satisfy the condition?
```

---

# 44. `every()`

`every()` checks whether **all** elements satisfy a condition.

```js
const numbers = [2, 4, 6];

console.log(
    numbers.every(number => number % 2 === 0)
);

// true
```

Think:

```text
Do ALL elements satisfy the condition?
```

---

# 45. `reduce()`

`reduce()` processes an array and produces a single accumulated result.

Example:

```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(
    (accumulator, currentValue) =>
        accumulator + currentValue,
    0
);

console.log(sum);
// 15
```

---

## Understanding `reduce()`

The initial value is:

```text
accumulator = 0
```

Then:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
```

Final result:

```text
15
```

---

# 46. `reduce()` Parameters

The callback commonly receives:

```text
accumulator
currentValue
currentIndex
array
```

Example:

```js
numbers.reduce(
    (accumulator, currentValue, index, array) => {
        // ...
    },
    0
);
```

The second argument to `reduce()`:

```js
0
```

is the **initial accumulator value**.

---

# 47. Practical Array of Objects

A very common structure in JavaScript is:

```js
const products = [
    {
        name: "Laptop",
        price: 1000,
        type: "Electronics"
    },
    {
        name: "Phone",
        price: 500,
        type: "Electronics"
    },
    {
        name: "Shirt",
        price: 50,
        type: "Clothing"
    }
];
```

Now array methods become extremely powerful.

---

## Filter Products

```js
const expensiveProducts = products.filter(
    product => product.price >= 200
);
```

---

## Sort Products

```js
const productList = products
    .filter(product => product.price >= 200)
    .sort((a, b) => a.price - b.price);
```

This demonstrates **method chaining**.

Conceptually:

```text
products
   ↓
filter()
   ↓
products >= 200
   ↓
sort()
   ↓
sorted products
```

---

# 48. `map()` with Objects

Suppose we only want the name and price:

```js
const productDetails = products.map(
    product => ({
        name: product.name,
        price: product.price
    })
);
```

Result:

```js
[
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Shirt", price: 50 }
]
```

This is one of the most common patterns when processing API data.

---

# 49. Array Methods Summary

| Method | Main purpose | Returns |
|---|---|---|
| `forEach()` | Perform an action | `undefined` |
| `map()` | Transform elements | New array |
| `filter()` | Select elements | New array |
| `find()` | Find first match | Element / `undefined` |
| `findIndex()` | Find first matching index | Number |
| `some()` | Check if any match | Boolean |
| `every()` | Check if all match | Boolean |
| `reduce()` | Accumulate values | Any single result |

### Mental shortcuts

```text
forEach → do something
map     → transform
filter  → keep some
find    → get one
some    → any?
every   → all?
reduce  → combine
```

---

# 50. `Set`

A `Set` is a collection of **unique values**.

```js
const set = new Set();

set.add(1);
set.add(2);
set.add(2);

console.log(set);
```

The second `2` is ignored because a `Set` cannot contain duplicate values.

---

# 51. Creating a Set from an Array

```js
const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const set = new Set(arr);

console.log(set);
```

The duplicates are removed.

Conceptually:

```text
Array:
[1, 2, 3, 4, 5, 1, 2, 3]

        ↓ Set

Set:
{1, 2, 3, 4, 5}
```

---

# 52. Common Set Methods

## `add()`

```js
set.add(10);
```

Adds a value.

---

## `has()`

Checks whether a value exists.

```js
console.log(set.has(1));
// true

console.log(set.has(6));
// false
```

---

## `delete()`

Removes a value.

```js
set.delete(1);
```

---

## `size`

Returns the number of unique values.

```js
console.log(set.size);
```

Notice:

```text
Set → size
Array → length
```

---

## `clear()`

Removes everything:

```js
set.clear();
```

---

# 53. Converting a Set Back to an Array

Use spread:

```js
const set = new Set([1, 2, 3]);

const arr = [...set];

console.log(arr);
// [1, 2, 3]
```

Another option:

```js
const arr = Array.from(set);
```

---

# 54. Common Use of `Set`: Removing Duplicates

A very useful pattern:

```js
const numbers = [1, 2, 2, 3, 3, 4, 4];

const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers);
// [1, 2, 3, 4]
```

This is one of the most useful practical applications of `Set`.

---

# 55. `Map`

A `Map` is a collection of **key-value pairs**.

```js
const map = new Map();

map.set("name", "John");
map.set("age", 30);
map.set("city", "New York");
```

Read a value:

```js
console.log(map.get("name"));
// John
```

---

# 56. Common Map Methods

## `set()`

Adds or updates a key-value pair.

```js
map.set("age", 31);
```

---

## `get()`

Gets the value associated with a key.

```js
console.log(map.get("age"));
```

If the key doesn't exist:

```js
map.get("unknown");
// undefined
```

---

## `has()`

Checks whether a key exists:

```js
console.log(map.has("age"));
// true
```

---

## `delete()`

Removes a key-value pair:

```js
map.delete("city");
```

---

## `clear()`

Removes all entries:

```js
map.clear();
```

---

## `size`

Returns the number of entries:

```js
console.log(map.size);
```

---

# 57. Map Keys Can Be Different Types

One major difference between `Map` and ordinary objects is that `Map` keys can be values of **any type**.

Example:

```js
const map = new Map([
    [true, "John"],
    ["age", 30],
    ["city", "New York"],
    [2, "Two"],
    [[1, 2, 3], "Array Key"]
]);
```

Keys can therefore be:

```text
string
number
boolean
object
array
function
symbol
etc.
```

---

# 58. Object vs Map

Both can represent key-value relationships, but they are designed for somewhat different purposes.

### Object

```js
const person = {
    name: "John",
    age: 30
};
```

Good for representing an entity with named properties.

Example:

```text
person
├── name
├── age
└── city
```

### Map

```js
const map = new Map();

map.set("name", "John");
map.set("age", 30);
```

Good when you need a dedicated key-value collection.

### Key difference

Objects traditionally use property keys that are strings or symbols.

Maps allow keys of essentially any value type.

---

# 59. Set vs Map

```text
Set
 ↓
unique values

Map
 ↓
key → value pairs
```

Example:

```js
const set = new Set([1, 2, 3]);

const map = new Map([
    ["name", "John"],
    ["age", 30]
]);
```

Think:

```text
Set:
{1, 2, 3}

Map:
{
    "name" → "John",
    "age"  → 30
}
```

---

# 60. Functions + Arrays + Objects

The concepts you've learned so far start becoming much more powerful when combined.

Example:

```js
const students = [
    {
        name: "Abhinav",
        age: 21,
        marks: 92
    },
    {
        name: "Rohit",
        age: 22,
        marks: 78
    },
    {
        name: "Mohit",
        age: 20,
        marks: 88
    }
];
```

Get names:

```js
const names = students.map(
    student => student.name
);
```

Get students with marks >= 85:

```js
const highScorers = students.filter(
    student => student.marks >= 85
);
```

Find the first student with marks >= 90:

```js
const topStudent = students.find(
    student => student.marks >= 90
);
```

Calculate total marks:

```js
const totalMarks = students.reduce(
    (total, student) => total + student.marks,
    0
);
```

Calculate average:

```js
const averageMarks =
    totalMarks / students.length;
```

This combination is extremely important because real-world JavaScript frequently works with:

```text
Array of Objects
        ↓
map / filter / find / reduce
        ↓
processed data
```

---

# 61. Method Chaining

Many array methods return arrays, so they can be chained.

Example:

```js
const result = products
    .filter(product => product.price >= 200)
    .map(product => product.name)
    .sort();
```

The process is:

```text
products
   ↓
filter()
   ↓
expensive products
   ↓
map()
   ↓
product names
   ↓
sort()
   ↓
sorted names
```

Method chaining can make data-processing code concise, but avoid making chains so complicated that they become difficult to read.

---

# 62. Mutation vs Non-Mutation

This distinction is important.

Some methods modify the original array:

```text
push()
pop()
shift()
unshift()
splice()
sort()
```

Others create/return new results without modifying the original array:

```text
slice()
concat()
map()
filter()
find()
some()
every()
reduce()
flat()
```

Example:

```js
const numbers = [3, 1, 2];

const sorted = [...numbers].sort(
    (a, b) => a - b
);

console.log(numbers);
// [3, 1, 2]

console.log(sorted);
// [1, 2, 3]
```

The spread creates a copy before `sort()` mutates that copy.

---

# 63. Important Mental Model

At this point, you should be able to look at code like:

```js
const result = products
    .filter(product => product.price >= 200)
    .map(product => product.name)
    .sort();
```

and mentally translate it into:

```text
Start with products
       ↓
Keep products priced >= 200
       ↓
Extract each product's name
       ↓
Sort the resulting names
       ↓
Store the final array in result
```

That ability is more important than memorizing every method.

---

# 64. Quick Cheat Sheet

## Functions

```js
function add(a, b) {
    return a + b;
}
```

## Default parameters

```js
function add(a, b = 0) {
    return a + b;
}
```

## Rest parameters

```js
function add(...numbers) {
    // numbers is an array
}
```

## Function expression

```js
const add = function(a, b) {
    return a + b;
};
```

## Arrow function

```js
const add = (a, b) => a + b;
```

## IIFE

```js
(function() {
    // code
})();
```

## Callback

```js
function execute(callback) {
    callback();
}
```

## Closure

```js
function outer() {
    let value = 10;

    return function() {
        return value;
    };
}
```

---

## Scope

```text
Global
Function
Block
```

`let` / `const`:

```text
block scoped
```

`var`:

```text
function scoped
```

---

## Array Methods

```js
arr.forEach();
arr.map();
arr.filter();
arr.find();
arr.findIndex();
arr.some();
arr.every();
arr.reduce();
```

Remember:

```text
forEach → do something
map     → transform
filter  → select
find    → find one
some    → any?
every   → all?
reduce  → combine
```

---

## Set

```js
const set = new Set();

set.add(value);
set.has(value);
set.delete(value);
set.clear();

set.size;
```

---

## Map

```js
const map = new Map();

map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.clear();

map.size;
```

---

# 65. Big Picture

```text
JavaScript
│
├── Functions
│   ├── Parameters
│   ├── Arguments
│   ├── Return values
│   ├── Default parameters
│   ├── Rest parameters
│   ├── Function declarations
│   ├── Function expressions
│   ├── Arrow functions
│   └── IIFE
│
├── Function Concepts
│   ├── Callbacks
│   ├── Higher-order functions
│   ├── Scope
│   ├── Hoisting
│   └── Closures
│
├── Array Processing
│   ├── forEach
│   ├── map
│   ├── filter
│   ├── find
│   ├── findIndex
│   ├── some
│   ├── every
│   └── reduce
│
└── Collections
    ├── Set
    │   ├── unique values
    │   ├── add
    │   ├── has
    │   ├── delete
    │   └── clear
    │
    └── Map
        ├── key-value pairs
        ├── set
        ├── get
        ├── has
        ├── delete
        └── clear
```

---