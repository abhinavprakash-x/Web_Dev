# Event Loop in JavaScript

JavaScript is **single-threaded**, meaning JavaScript code is executed by one main call stack at a time.

However, JavaScript runs inside an environment such as a **browser** or **Node.js**, and that environment provides APIs and mechanisms that allow asynchronous operations.

This is what allows JavaScript to perform operations such as:

- Timers
- Network requests
- DOM events
- File operations
- Promise callbacks

without blocking the JavaScript call stack while the external operation is in progress.

---

# 1. Synchronous vs Asynchronous JavaScript

## Synchronous

Synchronous code executes one operation at a time.

```js
console.log("A");
console.log("B");
console.log("C");
```

Output:

```text
A
B
C
```

Each statement finishes before the next one starts.

---

## Asynchronous

Asynchronous operations can be started without making the JavaScript thread wait for them to finish.

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 1000);

console.log("C");
```

Output:

```text
A
C
B
```

The timer is started, but JavaScript continues executing the next statement instead of waiting one second.

---

# 2. Web APIs

A browser provides many APIs that JavaScript can use.

These are called **Web APIs**.

They are provided by the browser environment rather than being part of the core JavaScript language itself.

Examples include:

- `setTimeout()`
- `setInterval()`
- `fetch()`
- DOM APIs
- `localStorage`
- `location`
- Browser event APIs
- `console`

For example:

```js
setTimeout(() => {
    console.log("Hello");
}, 1000);
```

`setTimeout()` is provided by the browser environment.

---

# 3. JavaScript + Browser

A simplified view of the browser environment is:

```text
JavaScript
    │
    ▼
Call Stack
    │
    │ asynchronous operation
    ▼
Browser / Web APIs
    │
    ▼
Task / Microtask Queues
    │
    ▼
Event Loop
    │
    ▼
Call Stack
```

JavaScript itself executes code on the call stack.

The browser provides additional capabilities for things such as timers, networking, DOM events, and rendering.

---

# 4. Call Stack

The **call stack** keeps track of currently executing JavaScript functions.

Example:

```js
function first() {
    second();
}

function second() {
    console.log("Hello");
}

first();
```

Conceptually:

```text
first()
  ↓
second()
  ↓
console.log()
```

The most recently called function is executed first.

The stack follows:

> **LIFO — Last In, First Out**

---

# 5. `setTimeout()` and the Event Loop

Consider:

```js
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timeout
```

Even though the timeout is `0`, its callback does **not** immediately execute.

A simplified sequence is:

```text
1. "Start" goes onto the call stack
2. "Start" is printed
3. setTimeout() registers the timer
4. JavaScript continues
5. "End" is printed
6. Current synchronous code finishes
7. Timer callback becomes eligible to run
8. Event loop places it onto the call stack when possible
9. "Timeout" is printed
```

So:

> `setTimeout(fn, 0)` means "run this callback as soon as the event loop can schedule it", not "run it immediately."

---

# 6. Event Loop

The **event loop** coordinates asynchronous callbacks with the JavaScript call stack.

A simplified model:

```text
             ┌───────────────┐
             │   Call Stack  │
             └───────┬───────┘
                     │
                     ▼
              Event Loop
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   Microtask Queue         Task Queue
```

Basic idea:

```text
1. Execute synchronous JavaScript.
2. When the stack becomes empty, process microtasks.
3. Process an eligible task/callback.
4. Repeat.
```

The exact scheduling model is more detailed because browsers also perform rendering and other work, but this is a useful learning model.

---

# 7. Callback Queue / Task Queue

Callbacks from many asynchronous browser operations are scheduled as **tasks**.

Examples include callbacks associated with:

- Timers
- User interaction events
- Some browser APIs

When a task is ready and the call stack is available, the event loop allows it to execute.

Example:

```js
setTimeout(() => {
    console.log("Timer");
}, 1000);
```

After the timer expires, its callback becomes eligible to run as a task.

---

# 8. Microtask Queue

JavaScript also has a **microtask queue**.

Microtasks have higher scheduling priority than normal tasks.

Common sources of microtasks include:

- Promise reactions (`.then()`, `.catch()`, `.finally()`)
- `queueMicrotask()`
- `MutationObserver`

Example:

```js
console.log("A");

Promise.resolve().then(() => {
    console.log("B");
});

console.log("C");
```

Output:

```text
A
C
B
```

The Promise callback is asynchronous, so it does not interrupt the current synchronous code.

---

# 9. Microtasks vs Tasks

Consider:

```js
console.log("A");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("B");
```

Output:

```text
A
B
Promise
Timer
```

Why?

```text
Synchronous code
      ↓
Microtasks
      ↓
Tasks
```

So after the current synchronous code finishes, the Promise callback is processed before the timer task.

---

# 10. Event Loop — Simplified Algorithm

A useful mental model:

```text
1. Execute synchronous JavaScript.
2. Wait until the call stack becomes empty.
3. Process available microtasks.
4. Take an eligible task from the task queue.
5. Execute the task.
6. Process microtasks again.
7. Browser may perform rendering.
8. Repeat.
```

The actual browser event loop is more complex, but this model is enough for understanding most everyday asynchronous JavaScript.

---

# 11. Callback Hell

A **callback** is a function passed to another function to be executed later.

Callbacks are useful:

```js
setTimeout(() => {
    console.log("Done");
}, 1000);
```

However, deeply nested asynchronous callbacks can become difficult to read and maintain.

This is commonly called **callback hell**.

Example:

```js
function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched");
        callback();
    }, 1000);
}

fetchData(() => {
    setTimeout(() => {
        console.log("Processing data");

        setTimeout(() => {
            console.log("Data processed");

            setTimeout(() => {
                console.log("Finalizing");
            }, 1000);

        }, 1000);

    }, 1000);
});
```

The deeper the nesting becomes, the harder the code is to understand.

---

# 12. Fixing Callback Hell

Modern JavaScript commonly uses:

```text
Callbacks
    ↓
Promises
    ↓
async / await
```

Promises and `async/await` allow asynchronous operations to be represented in a cleaner way.

---

# 13. Promises

A **Promise** represents the eventual result of an asynchronous operation.

A Promise has three states:

```text
Pending
   │
   ├──→ Fulfilled
   │
   └──→ Rejected
```

### Pending

The operation is still in progress.

### Fulfilled

The operation completed successfully.

### Rejected

The operation failed.

---

# 14. Creating / Receiving a Promise

`fetch()` returns a Promise.

```js
const promise = fetch("https://api.github.com/users");
```

The request does not immediately give us the final response data.

Instead, we receive a Promise representing the future result.

---

# 15. `.then()`

`.then()` is used to handle a fulfilled Promise.

```js
fetch("https://api.github.com/users")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
```

The first `.then()` receives the `Response` object.

Then:

```js
response.json()
```

returns another Promise.

The next `.then()` receives the parsed JSON data.

---

# 16. Promise Chaining

Promises can be chained:

```js
fetch("https://api.github.com/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

Conceptually:

```text
fetch()
  ↓
Response
  ↓
response.json()
  ↓
Parsed data
```

Each `.then()` can return a value or another Promise.

---

# 17. `.catch()`

`.catch()` handles a rejected Promise.

```js
fetch("https://api.github.com/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

A useful pattern is:

```text
.then()  → success
.catch() → error
```

---

# 18. `fetch()` and HTTP Errors

One important detail:

`fetch()` does **not** automatically reject the Promise for HTTP error status codes such as:

```text
404
500
```

The network request can successfully receive a response even if the HTTP status represents an error.

Use:

```js
const response = await fetch(url);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}
```

`response.ok` is:

```text
true  → status 200–299
false → otherwise
```

---

# 19. `.finally()`

`.finally()` runs after a Promise settles, regardless of whether it was fulfilled or rejected.

```js
fetch(url)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log("Request finished");
    });
```

Useful for cleanup operations such as:

- Hiding a loading indicator
- Re-enabling a button
- Closing a resource

---

# 20. JSON

**JSON** stands for:

> JavaScript Object Notation

It is a text-based data format commonly used for exchanging data between applications.

Example JSON:

```json
{
    "name": "Abhinav",
    "age": 20,
    "skills": ["JavaScript", "C++"]
}
```

JSON is commonly used with APIs.

---

# 21. JavaScript Object vs JSON

A JavaScript object:

```js
const user = {
    name: "Abhinav",
    age: 20
};
```

is an actual JavaScript value.

JSON is a **string format**:

```js
const jsonUser = '{"name":"Abhinav","age":20}';
```

The two may represent similar data, but they are not the same thing.

---

## JavaScript Object

Can contain things such as:

```js
const user = {
    name: "Abhinav",
    greet() {
        console.log("Hello");
    }
};
```

Objects can contain functions and other JavaScript-specific values.

---

## JSON

JSON has stricter syntax.

Keys and strings use **double quotes**:

```json
{
    "name": "Abhinav",
    "age": 20
}
```

JSON cannot directly represent JavaScript functions.

---

# 22. `JSON.stringify()`

Converts a JavaScript value into a JSON string.

```js
const user = {
    name: "Abhinav",
    age: 20
};

const json = JSON.stringify(user);

console.log(json);
```

Result:

```text
{"name":"Abhinav","age":20}
```

---

# 23. `JSON.parse()`

Converts a JSON string into a JavaScript value.

```js
const json = '{"name":"Abhinav","age":20}';

const user = JSON.parse(json);

console.log(user.name);
```

Output:

```text
Abhinav
```

So remember:

```text
Object → JSON string
JSON.stringify()

JSON string → JavaScript value
JSON.parse()
```

---

# 24. Async / Await

`async/await` provides a cleaner syntax for working with Promises.

Instead of:

```js
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
```

we can write:

```js
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

# 25. `async`

The `async` keyword makes a function return a Promise.

```js
async function hello() {
    return "Hello";
}
```

Conceptually:

```js
hello()
```

returns a Promise that fulfills with:

```text
"Hello"
```

So:

```js
hello().then(value => {
    console.log(value);
});
```

prints:

```text
Hello
```

---

# 26. `await`

`await` waits for a Promise to settle **inside an async function**.

Example:

```js
async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}
```

`await` makes the code look synchronous, but it does **not block the entire JavaScript thread** while waiting for the Promise.

The async function pauses at the `await` and can resume later when the Promise settles.

---

# 27. `try / catch`

Errors from awaited Promises can be handled using `try/catch`.

```js
async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Error:", error);
    }
}
```

This gives us:

```text
try
 ↓
Attempt asynchronous operation
 ↓
Success → continue
 ↓
Failure → catch
```

---

# 28. `Promise.all()`

When multiple independent asynchronous operations need to happen, `Promise.all()` can run them concurrently.

Example:

```js
async function userDetails() {
    const [user1, user2, user3] = await Promise.all([
        fetch("/users/1").then(res => res.json()),
        fetch("/users/2").then(res => res.json()),
        fetch("/users/3").then(res => res.json())
    ]);

    console.log(user1);
    console.log(user2);
    console.log(user3);
}
```

This is preferable to unnecessarily waiting for each request one after another when the requests are independent.

---

# 29. Important Async Flow

A useful mental model:

```text
JavaScript code
      │
      ▼
   Call Stack
      │
      ▼
Asynchronous operation
      │
      ▼
Browser / Runtime
      │
      ▼
Promise / Task becomes ready
      │
      ▼
Queue
      │
      ▼
Event Loop
      │
      ▼
Call Stack
```

This is the basic idea behind asynchronous JavaScript.

---

# Prototypes and Classes

JavaScript uses **prototype-based inheritance**.

Objects can inherit properties and methods from other objects through the **prototype chain**.

---

# 30. Prototype

Every ordinary JavaScript object has an internal link to another object called its **prototype**.

The prototype can provide properties and methods that the object itself does not directly contain.

For example:

```js
const arr = [1, 2, 3];

arr.push(4);
```

`push()` does not need to be separately created for every array.

It comes from:

```text
arr
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null
```

---

# 31. Prototype Chain

Common prototype chains look like:

```text
Object
  ↓
Object.prototype
  ↓
null
```

For an array:

```text
Array
  ↓
Array.prototype
  ↓
Object.prototype
  ↓
null
```

For a function:

```text
Function
  ↓
Function.prototype
  ↓
Object.prototype
  ↓
null
```

When JavaScript looks for a property or method, it can search through this chain.

---

# 32. `__proto__`

`__proto__` provides access to an object's prototype in many JavaScript environments.

Example:

```js
const arr = [];

console.log(arr.__proto__);
```

This refers to:

```js
Array.prototype
```

### Important

For modern code, `__proto__` is generally not the preferred way to work with prototypes.

Use standard APIs such as:

```js
Object.getPrototypeOf(obj);
```

and:

```js
Object.setPrototypeOf(obj, prototype);
```

when you actually need to manipulate prototypes.

---

# 33. Built-in Prototypes

JavaScript's built-in objects have prototypes containing commonly used methods.

### Array

```js
Array.prototype.push
Array.prototype.pop
Array.prototype.map
Array.prototype.filter
```

### Function

```js
Function.prototype.call
Function.prototype.apply
Function.prototype.bind
```

This is one reason methods can be shared efficiently between objects of the same type.

---

# 34. Classes

JavaScript also provides `class` syntax for creating objects and organizing inheritance.

Example:

```js
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, I am ${this.name}`);
    }
}

const person = new Person("Abhinav");

person.greet();
```

The method `greet()` is placed on:

```text
Person.prototype
```

rather than creating a separate copy of the method for every instance.

---

# 35. `this`

`this` refers to a value determined by **how a function is called**.

For a method call:

```js
const user = {
    name: "Abhinav",

    greet() {
        console.log(this.name);
    }
};

user.greet();
```

Here:

```text
this → user
```

Therefore:

```text
this.name → "Abhinav"
```

### Important

`this` is **not simply "the current object" in every situation**.

Its value depends on the calling context, and arrow functions behave differently.

---

# 36. `super`

`super` is used in a derived class to access the parent class.

Example:

```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        super.speak();
        console.log(`${this.name} barks`);
    }
}
```

Here:

```js
super(name);
```

calls the parent class constructor.

And:

```js
super.speak();
```

calls the parent class method.

---

# `call()`, `apply()`, and `bind()`

These methods allow us to explicitly control the `this` value used by a normal function.

---

# 37. `call()`

`call()` immediately invokes a function with a specified `this` value.

```js
function greet(message) {
    console.log(message + ", " + this.name);
}

const user = {
    name: "Abhinav"
};

greet.call(user, "Hello");
```

Output:

```text
Hello, Abhinav
```

Arguments are passed individually.

```js
functionName.call(thisValue, arg1, arg2, ...);
```

---

# 38. `apply()`

`apply()` is similar to `call()`, but arguments are provided as an array-like value.

```js
function greet(message, punctuation) {
    console.log(message + ", " + this.name + punctuation);
}

const user = {
    name: "Abhinav"
};

greet.apply(user, ["Hello", "!"]);
```

The key difference:

```text
call()
→ arguments individually

apply()
→ arguments as an array-like value
```

---

# 39. `bind()`

`bind()` does **not** immediately call the function.

Instead, it creates a new function with a bound `this` value.

```js
function greet() {
    console.log("Hello " + this.name);
}

const user = {
    name: "Abhinav"
};

const boundGreet = greet.bind(user);

boundGreet();
```

So:

```text
call()
→ calls immediately

apply()
→ calls immediately

bind()
→ returns a new function
```

---

# Strict Mode

Strict mode enables a stricter set of JavaScript rules.

Enable it with:

```js
"use strict";
```

It helps detect certain problematic patterns and prevents some silent errors.

Example:

```js
"use strict";

x = 10;
```

This causes an error because `x` has not been declared.

---

# 40. `this` and Strict Mode

Consider a normal function:

```js
function showThis() {
    console.log(this);
}
```

In **non-strict mode**, a standalone function call in a browser historically results in `this` referring to the global object.

In **strict mode**:

```js
"use strict";

function showThis() {
    console.log(this);
}

showThis();
```

`this` is:

```text
undefined
```

when the function is called without an owning object.

---

# 41. Arrow Functions and `this`

Arrow functions do **not** have their own `this`.

Instead, they inherit `this` from their surrounding lexical scope.

Example:

```js
const user = {
    name: "Abhinav",

    greet() {
        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

user.greet();
```

The arrow function uses the `this` from `greet()`.

This is called **lexical `this`**.

### Remember

```text
Normal function
→ this depends on how it is called

Arrow function
→ this comes from the surrounding scope
```

---

# Browser vs Node.js

JavaScript can run in different environments.

The browser provides objects such as:

```js
window
document
location
```

Node.js provides a different runtime environment and does not have a browser `window` object by default.

Node.js has its own global environment.

---

# 42. `globalThis`

`globalThis` provides a standard way to access the global object across JavaScript environments.

For example:

```js
console.log(globalThis);
```

Depending on the environment, it refers to that environment's global object.

Conceptually:

```text
Browser
globalThis → window

Node.js
globalThis → Node's global object
```

This makes `globalThis` useful when writing environment-independent code.

---

# Final Summary

## JavaScript Execution

```text
JavaScript
   ↓
Call Stack
   ↓
Synchronous execution
```

For asynchronous work:

```text
JavaScript
   ↓
Browser / Runtime APIs
   ↓
Queues
   ↓
Event Loop
   ↓
Call Stack
```

---

## Async JavaScript

```text
Callbacks
    ↓
Promises
    ↓
async / await
```

### Promise states

```text
Pending
  ├──→ Fulfilled
  └──→ Rejected
```

### Important Promise methods

```js
.then()
.catch()
.finally()
```

### Important JSON methods

```js
JSON.stringify()
JSON.parse()
```

### Multiple independent Promises

```js
Promise.all()
```

---

## Prototypes

```text
Object
  ↓
Object.prototype
  ↓
null
```

```text
Array
  ↓
Array.prototype
  ↓
Object.prototype
  ↓
null
```

---

## `call`, `apply`, `bind`

```text
call()
→ invoke now + individual arguments

apply()
→ invoke now + array-like arguments

bind()
→ create a new function
```

---

## `this`

```text
Normal function
→ determined by how it is called

Arrow function
→ inherited lexically from surrounding scope
```

---

# SUMMARY
JavaScript is weird but it's the only language that runs in the browser. So deal with it.