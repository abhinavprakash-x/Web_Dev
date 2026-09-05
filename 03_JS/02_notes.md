# JavaScript Notes — Part 2

# Video 5: JS Numbers and `Math` Object

## Number Methods

### `toFixed()`

```js
num.toFixed(n)
```

Returns a **string** containing the number rounded to `n` digits after the decimal point.

```js
let num = 34.26785;

console.log(num.toFixed(1)); // "34.3"
console.log(num.toFixed(3)); // "34.268"
```

> `toFixed()` returns a **string**, not a number.

---

## `toPrecision()`

```js
num.toPrecision(n)
```

Returns a **string** representing the number with approximately `n` significant digits.

```js
let num = 34.26785;

console.log(num.toPrecision(2)); // "34"
console.log(num.toPrecision(4)); // "34.27"
```

The important difference is:

```text
`toFixed(n)`     → n digits after the decimal point
`toPrecision(n)` → n significant digits
```

---

## `toString()`

```js
num.toString()
```

Converts a value to a string.

```js
let num = 123;

console.log(num.toString());
console.log(typeof num.toString()); // "string"
```

---

# `new` and Number Objects

Using `new Number(...)` creates a **Number object**, not a primitive number.

```js
let n = new Number(12);

console.log(typeof n); // "object"
```

Normally, use a number literal instead:

```js
let n = 12;
```

> `new Number(12)` is generally not needed in normal JavaScript code.

---

# Comparing Primitive and Non-Primitive Values

Primitive values are compared by their values.

Objects are compared by **reference identity**.

```js
let a = 10;
let b = 10;

console.log(a === b); // true
```

But:

```js
let obj1 = { value: 10 };
let obj2 = { value: 10 };

console.log(obj1 === obj2); // false
```

Even though both objects contain the same data, they are two different objects.

If two variables refer to the same object:

```js
let obj1 = { value: 10 };
let obj2 = obj1;

console.log(obj1 === obj2); // true
```

---

# `Math` Object

`Math` is a built-in object containing mathematical constants and functions.

## Common methods and constants

```js
Math.abs(-4);      // 4
Math.ceil(4.2);    // 5
Math.floor(4.8);   // 4
Math.round(4.5);   // 5
Math.max(1, 2, 3);  // 3
Math.min(1, 2, 3);  // 1
Math.pow(2, 3);    // 8
Math.sqrt(16);     // 4
Math.PI;           // approximately 3.14159...
```

---

## `Math.random()`

```js
Math.random()
```

Returns a pseudo-random number in the range:

```text
0 <= random number < 1
```

So `1` is **not** included.

Example:

```js
console.log(Math.random());
```

---

## Random Integer in a Range

To generate a random integer from `min` to `max`, **including both endpoints**:

```js
Math.floor(Math.random() * (max - min + 1)) + min
```

Example:

```js
let min = 15;
let max = 25;

let randomNumber = Math.floor(
    Math.random() * (max - min + 1)
) + min;

console.log(randomNumber);
```

This produces an integer from **15 through 25**.

---

# Video 6: JS Strings and Dates

# Strings

A string represents text.

JavaScript supports several ways to create strings:

```js
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`;
```

The backtick form is called a **template literal**.

---

## Multi-Line Strings

Template literals can span multiple lines:

```js
let str = `Hello
World`;
```

Regular single-quoted and double-quoted strings cannot contain an unescaped literal newline in the same way.

---

## Template Literal Interpolation

Template literals allow expressions to be embedded using:

```js
${expression}
```

Example:

```js
let num = 10;
let str = `The number is ${num}`;

console.log(str);
```

This is similar to formatted string output in other languages.

---

# Common String Properties and Methods

## `length`

```js
let str = "Hello";

console.log(str.length); // 5
```

Returns the number of UTF-16 code units in the string.

---

## Changing Case

```js
str.toUpperCase();
str.toLowerCase();
```

These return **new strings** because strings are immutable.

---

## Accessing Characters

```js
str.charAt(1);
str[3];
```

Indexes start at `0`.

---

## Searching

```js
str.indexOf("l");
str.lastIndexOf("l");
str.includes("lo");
str.startsWith("He");
str.endsWith("lo");
```

---

## Extracting Parts of a String

```js
str.slice(start, end);
str.substring(start, end);
```

The `end` index is not included.

`slice()` also supports negative indexes:

```js
str.slice(-3);
```

---

## Concatenation

Using `+`:

```js
let str = str1 + " " + str2;
```

Or using `concat()`:

```js
let str = str1.concat(" ", str2);
```

Template literals are often more convenient for combining values with text.

---

## `split()`

Splits a string into an array.

```js
let str = "Abhinav,AA,BB,CC";

console.log(str.split(","));
```

Result:

```text
["Abhinav", "AA", "BB", "CC"]
```

---

## `replace()` and `replaceAll()`

```js
str.replace("Abhinav", "John");
```

Replaces the first matching occurrence for a string search.

```js
str.replaceAll("A", "o");
```

Replaces all matching occurrences.

Both return a **new string**.

---

## Trimming Whitespace

```js
str.trim();
str.trimStart();
str.trimEnd();
```

These return strings with whitespace removed from both ends, the beginning, or the end respectively.

---

# Date Object

JavaScript provides the `Date` object for working with dates and times.

## Current Date and Time

```js
let time = new Date();
```

A `Date` object represents a specific point in time.

To display it using the local time-zone representation:

```js
console.log(time.toString());
```

---

## Getting Date and Time Components

```js
time.getFullYear();
time.getMonth();
time.getDate();
time.getDay();

time.getHours();
time.getMinutes();
time.getSeconds();
```

Important:

```text
getMonth() → 0 to 11
getDate()  → day of the month, 1 to 31
getDay()   → day of the week, 0 to 6
```

For example:

```js
console.log(time.getMonth() + 1);
```

is commonly used when you want a human-readable month number from `1` to `12`.

---

## Creating a Custom Date

```js
let date = new Date(2020, 11, 25, 10, 30, 0);
```

The numeric constructor uses local time and the month is **zero-indexed**:

```text
January  → 0
February → 1
...
December → 11
```

So `11` means December.

---

# Timestamp

JavaScript represents a `Date` internally as a number of milliseconds relative to the Unix epoch:

```text
1 January 1970, 00:00:00 UTC
```

`Date.now()` returns the current timestamp in milliseconds.

```js
let timestamp = Date.now();
console.log(timestamp);
```

You can also create a `Date` from a timestamp:

```js
let date = new Date(timestamp);
```

> A timestamp is not specifically an API call to the OS. The JavaScript runtime obtains the current time from its host environment and exposes it through the `Date` APIs.

---

# Video 7: JS Arrays

## What is an Array?

An array is an **ordered collection of values**.

```js
let arr = [10, 20, 30, 40];
```

Array indexes start at `0`:

```text
index:  0   1   2   3
value: 10  20  30  40
```

Access an element:

```js
console.log(arr[0]); // 10
console.log(arr[2]); // 30
```

Change an element:

```js
arr[1] = 99;
```

---

## Arrays Can Contain Different Types

JavaScript arrays can contain values of different types:

```js
let arr = [10, "Hello", true, null, [1, 2]];
```

They can also contain objects, functions, or other arrays.

---

## Arrays Are Objects

```js
typeof [];
// "object"
```

Arrays are specialized objects with array-specific behavior.

Their indexes behave like property keys, while the array also maintains a `length` property.

---

## `length`

```js
let arr = [10, 20, 30];

console.log(arr.length); // 3
```

`length` is one greater than the highest occupied array index in the usual dense-array case, and assigning beyond the current end can increase it.

Example:

```js
arr[5] = 100;
console.log(arr.length); // 6
```

This also leaves empty slots between indexes `3` and `5`.

---

# Adding and Removing Elements

## `push()`

Adds one or more elements to the **end** of the array.

```js
let arr = [1, 2, 3];

arr.push(4);

console.log(arr); // [1, 2, 3, 4]
```

Returns the new array length.

---

## `pop()`

Removes the last element.

```js
let arr = [1, 2, 3];

let value = arr.pop();

console.log(value); // 3
console.log(arr);   // [1, 2]
```

---

## `unshift()`

Adds elements to the **beginning**.

```js
arr.unshift(0);
```

---

## `shift()`

Removes the first element.

```js
arr.shift();
```

---

# `slice()`

Returns a portion of an array **without changing the original array**.

```js
let arr = [10, 20, 30, 40, 50];

let part = arr.slice(1, 4);

console.log(part); // [20, 30, 40]
```

The end index is not included.

---

# `splice()`

Used to **add, remove, or replace** elements at a specific position.

```js
let arr = [10, 20, 30, 40];

arr.splice(1, 2);

console.log(arr); // [10, 40]
```

Here:

```text
start = 1
items to delete = 2
```

It **mutates the original array**.

It can also insert values:

```js
arr.splice(1, 0, 20, 30);
```

---

# `concat()`

Combines arrays and returns a **new array**.

```js
let a = [1, 2];
let b = [3, 4];

let c = a.concat(b);

console.log(c); // [1, 2, 3, 4]
```

---

# Spread Operator `...`

Another convenient way to combine arrays:

```js
let a = [1, 2];
let b = [3, 4];

let c = [...a, ...b];
```

This creates a new array containing the elements of both arrays.

---

# `toString()` and `join()`

```js
let arr = [1, 2, 3];

console.log(arr.toString());
```

`join()` gives you control over the separator:

```js
console.log(arr.join("-"));
// "1-2-3"
```

---

# `sort()`

Sorts the array **in place** and returns the same array.

### Important JavaScript behavior

Without a comparison function, elements are converted to strings and sorted according to their string order based on ASCII values.
```js
let arr = [10, 2, 30, 4];

arr.sort();

console.log(arr);
```

This does **not** perform normal numeric sorting.

For numbers, use a comparator:

```js
arr.sort((a, b) => a - b);
```

Descending order:

```js
arr.sort((a, b) => b - a);
```

---

# `flat()`

Flattens nested arrays by a specified depth.

```js
let arr = [1, [2, 3], [4, [5]]];

console.log(arr.flat());
// [1, 2, 3, 4, [5]]
```

For deeper nesting:

```js
console.log(arr.flat(2));
```

To flatten all levels:

```js
arr.flat(Infinity);
```

---

# Common Array Methods — Quick Table

| Method | Purpose | Mutates original? |
|---|---|---|
| `push()` | Add to end | Yes |
| `pop()` | Remove from end | Yes |
| `unshift()` | Add to beginning | Yes |
| `shift()` | Remove from beginning | Yes |
| `slice()` | Extract a portion | No |
| `splice()` | Add/remove/replace | Yes |
| `concat()` | Combine arrays | No |
| `join()` | Convert to string with separator | No |
| `sort()` | Sort elements | Yes |
| `flat()` | Flatten nested arrays | No |

> `sort()` returns the array after sorting it, but the important point is that it changes the existing array.

Arrays aren't arrays in JS but Objects because true arrays store similar data in `contiguous memory` but this is not true for JS arrays.
# Video 8: JS Objects

## What is an Object?

An object stores related information as **key-value pairs**.

```js
let student = {
    name: "Abhinav",
    age: 21,
    course: "CSE"
};
```

Conceptually:

```text
key      value
----------------
name     "Abhinav"
age      21
course   "CSE"
```

Objects are useful for representing structured data.

---

# Creating Objects

```js
let person = {
    name: "Abhinav",
    age: 21,
    isStudent: true
};
```

An object can contain values of different types, including other objects, arrays, and functions.

---

# Reading Properties

## Dot notation

```js
console.log(person.name);
console.log(person.age);
```

## Bracket notation

```js
console.log(person["name"]);
```

Bracket notation is especially useful when the property name is stored in a variable:

```js
let key = "age";

console.log(person[key]);
```

---

# Adding and Updating Properties

Add a new property:

```js
person.city = "Delhi";
```

Update an existing property:

```js
person.age = 22;
```

Both operations use the same assignment syntax.

---

# Deleting Properties

Use `delete`:

```js
delete person.city;
```

The property is removed from the object.

---

# Objects Can Contain Objects and Arrays

```js
let student = {
    name: "Abhinav",
    marks: [90, 85, 92],
    address: {
        city: "Delhi",
        pin: 110001
    }
};
```

Access nested values using repeated property access:

```js
console.log(student.marks[0]);
console.log(student.address.city);
```

---

# Object References

Objects are reference values.

```js
let obj1 = {
    name: "Abhinav"
};

let obj2 = obj1;

obj2.name = "Abhi";

console.log(obj1.name); // "Abhi"
```

Both variables refer to the same object.

```text
obj1 ─────┐
          ├──→ { name: "Abhi" }
obj2 ─────┘
```

---

# Useful Object Methods

## `Object.keys()`

Returns an array containing the object's own enumerable property names.

```js
let person = {
    name: "Abhinav",
    age: 21
};

console.log(Object.keys(person));
// ["name", "age"]
```

---

## `Object.values()`

Returns an array containing the corresponding property values.

```js
console.log(Object.values(person));
// ["Abhinav", 21]
```

---

## `Object.entries()`

Returns an array of `[key, value]` pairs.

```js
console.log(Object.entries(person));
```

Conceptually:

```text
[
    ["name", "Abhinav"],
    ["age", 21]
]
```

---

# Objects and Arrays Together

A very common real-world structure is an **array of objects**:

```js
let students = [
    { name: "Abhinav", age: 21 },
    { name: "Rohit", age: 22 },
    { name: "Mohit", age: 20 }
];
```

Access values like:

```js
console.log(students[0].name);
console.log(students[1].age);
```

This pattern is extremely common when working with API data.

---

# A Note on Internal Implementation

JavaScript objects are implemented by the engine using internal data structures and optimizations. The exact representation is **engine-dependent**.

For learning JavaScript, focus first on the observable behavior:

```text
Object
  ↓
properties (key → value)
  ↓
read / add / update / delete
```

Avoid treating a particular internal structure such as a hash map as a guaranteed specification of how every JavaScript engine stores every object.

---

# Arrays vs Objects

```text
Array
  ↓
Ordered collection
  ↓
Access commonly by numeric index

Object
  ↓
Key-value collection
  ↓
Access by property key
```

Example:

```js
let fruits = ["Apple", "Banana", "Mango"];

let person = {
    name: "Abhinav",
    age: 21
};
```

Use an array when **order and indexed elements** are the main idea.

Use an object when **named properties describing one entity** are the main idea.

---

# Quick Cheat Sheet

## Numbers

```js
num.toFixed(2);
num.toPrecision(4);
num.toString();
```

## Math

```js
Math.abs();
Math.ceil();
Math.floor();
Math.round();
Math.max();
Math.min();
Math.pow();
Math.sqrt();
Math.random();
Math.PI;
```

## Strings

```js
str.length;
str.toUpperCase();
str.toLowerCase();
str.charAt();
str.indexOf();
str.includes();
str.slice();
str.substring();
str.split();
str.replace();
str.replaceAll();
str.trim();
```

## Dates

```js
new Date();
Date.now();
date.getFullYear();
date.getMonth();
date.getDate();
date.getDay();
date.getHours();
```

## Arrays

```js
arr.length;
arr.push();
arr.pop();
arr.unshift();
arr.shift();
arr.slice();
arr.splice();
arr.concat();
arr.join();
arr.sort();
arr.flat();
```

## Objects

```js
obj.key;
obj["key"];
obj.key = value;
delete obj.key;
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
```

---

# Big Picture

```text
JavaScript Data
      │
      ├── Numbers
      │     ├── Number methods
      │     └── Math object
      │
      ├── Strings
      │     └── String methods
      │
      ├── Dates
      │     └── timestamps / date components
      │
      ├── Arrays
      │     ├── indexed data
      │     ├── add/remove
      │     ├── extract/modify
      │     └── sort/flatten/combine
      │
      └── Objects
            ├── key-value data
            ├── nested data
            ├── CRUD operations
            └── Object utility methods
```
