# Event loop in JavaScript

JS is a synchronous, single-threaded language. This means that it can handle multiple operations at the same time without blocking the main thread. The event loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading tasks to the system kernel whenever possible.

## Web APIs

API (Application Programming Interface) is nothing but a function call.

The browser provides Web APIs that allow JavaScript to perform tasks like making HTTP requests, manipulating the DOM, and handling events. These APIs are not part of the JavaScript language itself but are provided by the browser environment.
- setTimeout
- setInterval
- fetch
- DOM APIs
- localStorage
- location
- console.log
etc.

JS is single-threaded, but the browser is multi-threaded. The browser can handle multiple tasks simultaneously, such as rendering the UI, handling user input, and executing JavaScript code. When a JavaScript function makes a call to a Web API, the browser can offload that task to a separate thread, allowing the main thread to continue executing other code.

When the Web API completes its task, it places a callback function in the callback queue. The event loop continuously checks the call stack and the callback queue. If the call stack is empty, it takes the first callback from the queue and pushes it onto the call stack for execution.

## Event loop
step 1. stack is empty or not
step 2. if stack is empty, check the callback queue
step 3. if callback queue is not empty, push the first callback onto the stack
step 4. execute the callback function
step 5. repeat the process

## Microtask Queue
Microtasks are a special type of task that have a higher priority than regular tasks in the callback queue. They are typically used for tasks that need to be executed immediately after the current operation completes, such as promises and mutation observers.

It includes:
- Promises
- MutationObserver
- queueMicrotask
- fetch (when using async/await)

## Callback Hell
Recursive or nested callbacks can lead to a situation known as "callback hell," where the code becomes difficult to read and maintain. This often occurs when multiple asynchronous operations are chained together, resulting in deeply nested functions.

```javascript
// Example of callback hell

function fetchData(callback) {
  setTimeout(() => {
    console.log('Data fetched');
    callback();
  }, 1000);
}

fetchData(() => {
  setTimeout(() => {
    console.log('Processing data');
    setTimeout(() => {
      console.log('Data processed');
      setTimeout(() => {
        console.log('Finalizing');
      }, 1000);
    }, 1000);
  }, 1000);
});
```

Fix? Use Promises or async/await to avoid callback hell and make the code more readable and maintainable.

## Promises
Promises are a way to handle asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never. A promise can be in one of three states: pending, fulfilled, or rejected.

- Pending: The initial state of a promise. The operation is still ongoing.
- Fulfilled: The operation completed successfully, and the promise has a value.
- Rejected: The operation failed, and the promise has a reason for the failure.

```javascript

const p1 = fetch('https://api.github.com/users');
const p2 = p1.then(response => {
  return response.json();
});

p2.then(data => {
  console.log(data);
});
```

```javascript
fetch('https://api.github.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  }).catch(error => {
    console.error('Error:', error);
  });
```

JSON : JavaScript Object Notation is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is often used to transmit data between a server and a web application as text.

JS Object vs JSON:
- JS Object: A data structure that represents a collection of key-value pairs in JavaScript.
- JSON: A string representation of a JavaScript object that can be transmitted over the network.

- JS Object: can contain functions, undefined, and other non-serializable values.
- JSON: can only contain serializable values like strings, numbers, arrays, and other objects. It cannot contain functions or undefined values.

- JS Object: has more flexible syntax and can use single or double quotes for keys and values. commas at the end of the last key-value pair are optional.
- JSON: has strict syntax rules and requires double quotes for keys and string values and commas at the end of each key-value pair except for the last one.

- JS Object: A data type.
- JSON: Just a String.

JSON.parse() : Converts a JSON string into a JavaScript object.
JSON.stringify() : Converts a JavaScript object into a JSON string.

1. fetch() : A Web API that allows you to make HTTP requests and handle responses. It returns a promise that resolves to the response of the request.
2. .then() : A method that is called on a promise to handle the resolved value or the rejected reason. It takes two arguments: a callback function for the fulfilled state and an optional callback function for the rejected state.
3. .catch() : A method that is called on a promise to handle the rejected reason. It takes one argument: a callback function for the rejected state.
4. .ok : A property of the response object that indicates whether the HTTP request was successful (status code 200-299) or not. It returns a boolean value: true for success and false for failure.
5. .finally() : A method that is called on a promise to execute a callback function regardless of whether the promise was fulfilled or rejected. It takes one argument: a callback function that will be executed after the promise settles.

## Async/Await
Async/await is a syntactic sugar built on top of promises that allows you to write asynchronous code in a more synchronous and readable manner. It makes it easier to work with promises by allowing you to use the `await` keyword to pause the execution of an async function until a promise is resolved or rejected.

1. `async` : A keyword used to declare an asynchronous function. It allows the use of the `await` keyword inside the function.
2. `await` : A keyword used to pause the execution of an async function until a promise is resolved or rejected. It can only be used inside an async function.
3. `try/catch` : A block of code used to handle errors in async/await. The `try` block contains the code that may throw an error, and the `catch` block contains the code that handles the error.
4. `async` : it makes a function return a promise. If the function returns a value, the promise will be resolved with that value. If the function throws an error, the promise will be rejected with that error.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.github.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

NOTE: Always use `await` inside an `async` function.

```javascript
async function userDetails() {
  const [id, name, email] = await Promise.all([
    fetch('https://api.github.com/users/1').then(res => res.json()),
    fetch('https://api.github.com/users/2').then(res => res.json()),
    fetch('https://api.github.com/users/3').then(res => res.json())
  ]);
}
```