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