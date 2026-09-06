# JavaScript Notes — Part 2

> **Topics:** Numbers & `Math` • Strings • Dates • Arrays • Objects  
> **Goal:** Understand JavaScript's core data types and the operations you'll use constantly when working with real data.

---

# 1. Numbers and the `Math` Object

## Number Methods

### `toFixed()`

```js
num.toFixed(n)
```

Returns a **string** containing the number rounded to `n` digits after the decimal point.

```js
const num = 34.26785;

console.log(num.toFixed(1)); // "34.3"
console.log(num.toFixed(3)); // "34.268"
```

> **Important:** `toFixed()` returns a string, not a number.

If you need a number afterward:

```js
const rounded = Number(num.toFixed(2));
```

---

## `toPrecision()`

```js
num.toPrecision(n)
```

Returns a string representing the number with `n` significant digits.

```js
const num = 34.26785;

console.log(num.toPrecision(2)); // "34"
console.log(num.toPrecision(4)); // "34.27"
```

### `toFixed()` vs `toPrecision()`

| Method | Controls |
|---|---|
| `toFixed(n)` | `n` digits after the decimal point |
| `toPrecision(n)` | `n` significant digits |

---

## `toString()`

```js
num.toString()
```

Converts a value to a string.

```js
const num = 123;

console.log(num.toString());        // "123"
console.log(typeof num.toString()); // "string"
```

---

# 2. Primitive Numbers vs Number Objects

Using `new Number(...)` creates a **Number object**, not a primitive number.

```js
const n = new Number(12);

console.log(typeof n); // "object"
```

Normally, use a number literal:

```js
const n = 12;
```

> `new Number(...)` is generally unnecessary in normal JavaScript code.

---

# 3. Comparing Values and References

Primitive values such as numbers are compared by their values:

```js
const a = 10;
const b = 10;

console.log(a === b); // true
```

Objects are compared by **reference identity**:

```js
const obj1 = { value: 10 };
const obj2 = { value: 10 };

console.log(obj1 === obj2); // false
```

Although they contain the same data, they are two different objects.

If two variables refer to the same object:

```js
const obj1 = { value: 10 };
const obj2 = obj1;

console.log(obj1 === obj2); // true
```

Think of it as:

```text
obj1 ─────┐
          ├──→ { value: 10 }
obj2 ─────┘
```

---

# 4. The `Math` Object

`Math` is a built-in object that provides mathematical constants and functions.

## Common methods

```js
Math.abs(-4);      // 4
Math.ceil(4.2);    // 5
Math.floor(4.8);   // 4
Math.round(4.5);   // 5
Math.max(1, 2, 3);  // 3
Math.min(1, 2, 3);  // 1
Math.pow(2, 3);    // 8
Math.sqrt(16);     // 4
Math.PI;           // approximately 3.14159
```

> `Math` is an object containing static methods and constants. You don't create a `Math` instance.

---

## `Math.random()`

```js
Math.random()
```

Returns a pseudo-random number in the range:

```text
0 <= value < 1
```

`1` is **never included**.

```js
console.log(Math.random());
```

---

## Random Integer in a Range

To generate an integer from `min` to `max`, **including both endpoints**:

```js
Math.floor(Math.random() * (max - min + 1)) + min
```

Example:

```js
const min = 15;
const max = 25;

const randomNumber =
    Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomNumber);
```

This produces an integer from **15 through 25**.

A useful reusable version:

```js
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6)); // 1–6
```

---

# 5. Strings

A string represents text.

JavaScript supports:

```js
const str1 = "Hello";
const str2 = 'World';
const str3 = `Hello World`;
```

The backtick form is called a **template literal**.

---

## Multi-Line Strings

Template literals can span multiple lines:

```js
const str = `Hello
World`;
```

Single-quoted and double-quoted strings require escape sequences for literal line breaks.

---

## Template Literal Interpolation

Template literals allow expressions to be embedded using:

```js
${expression}
```

Example:

```js
const num = 10;
const str = `The number is ${num}`;

console.log(str);
```

Expressions can be more complex:

```js
const a = 10;
const b = 20;

console.log(`Sum = ${a + b}`);
```

---

# 6. String Properties and Methods

## `length`

```js
const str = "Hello";

console.log(str.length); // 5
```

> `length` counts UTF-16 code units, so it does not always equal the number of user-perceived characters.

---

## Changing Case

```js
str.toUpperCase();
str.toLowerCase();
```

These return **new strings** because strings are immutable.

```js
const str = "Hello";

const upper = str.toUpperCase();

console.log(str);   // "Hello"
console.log(upper); // "HELLO"
```

---

## Accessing Characters

```js
const str = "Hello";

console.log(str.charAt(1)); // "e"
console.log(str[3]);        // "l"
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

Example:

```js
const str = "JavaScript";

console.log(str.includes("Script")); // true
console.log(str.indexOf("a"));       // 1
```

---

## Extracting Parts of a String

```js
str.slice(start, end);
str.substring(start, end);
```

The `end` index is not included.

```js
const str = "JavaScript";

console.log(str.slice(0, 4)); // "Java"
```

`slice()` also supports negative indexes:

```js
console.log(str.slice(-6)); // "Script"
```

### `slice()` vs `substring()`

For everyday code, prefer `slice()` when you need negative indexes or want behavior that is easier to reason about.

---

## Concatenation

Using `+`:

```js
const first = "Hello";
const second = "World";

const result = first + " " + second;
```

Or:

```js
const result = first.concat(" ", second);
```

Template literals are often the cleanest option:

```js
const result = `${first} ${second}`;
```

---

## `split()`

Splits a string into an array.

```js
const str = "Abhinav,AA,BB,CC";

console.log(str.split(","));
// ["Abhinav", "AA", "BB", "CC"]
```

You can also split every character:

```js
console.log("hello".split(""));
// ["h", "e", "l", "l", "o"]
```

---

## `replace()` and `replaceAll()`

```js
str.replace("Abhinav", "John");
```

For a string search, `replace()` replaces the first matching occurrence.

```js
str.replaceAll("A", "o");
```

`replaceAll()` replaces all matching occurrences.

Both return a **new string**.

---

## Trimming Whitespace

```js
str.trim();
str.trimStart();
str.trimEnd();
```

Example:

```js
const input = "   hello   ";

console.log(input.trim()); // "hello"
```

These return new strings.

---

# 7. Date and Time

JavaScript provides the `Date` object for representing a specific point in time.

## Current Date and Time

```js
const now = new Date();

console.log(now);
console.log(now.toString());
```

`Date` uses the host environment's current time information.

---

## Getting Date and Time Components

```js
now.getFullYear();
now.getMonth();
now.getDate();
now.getDay();

now.getHours();
now.getMinutes();
now.getSeconds();
```

Important:

```text
getMonth() → 0 to 11
getDate()  → day of the month, 1 to 31
getDay()   → day of the week, 0 to 6
```

So:

```js
console.log(now.getMonth() + 1);
```

is commonly used when you want a human-readable month number from `1` to `12`.

> `getDay()` is **not** the day of the month. It represents the weekday: Sunday = `0`, Monday = `1`, ..., Saturday = `6`.

---

## Creating a Custom Date

```js
const date = new Date(2020, 11, 25, 10, 30, 0);
```

The numeric constructor uses **local time**, and the month is zero-indexed:

```text
January  → 0
February → 1
...
December → 11
```

Therefore, `11` means December.

---

# 8. Timestamps

JavaScript represents a `Date` as a number of milliseconds relative to:

```text
1 January 1970, 00:00:00 UTC
```

`Date.now()` returns the current timestamp in milliseconds.

```js
const timestamp = Date.now();

console.log(timestamp);
```

You can create a `Date` from a timestamp:

```js
const date = new Date(timestamp);
```

> A timestamp is not itself an OS API call. The JavaScript runtime obtains current time information from its host environment and exposes it through the `Date` APIs.

### ISO strings

For data exchange, ISO 8601 strings are commonly used:

```js
const date = new Date("2026-09-06T10:30:00Z");

console.log(date.toISOString());
```

> When parsing dates from external data, prefer well-defined formats such as ISO 8601 rather than ambiguous date strings.

---

# 9. Arrays

## What is an Array?

An array is an **ordered collection of values**.

```js
const arr = [10, 20, 30, 40];
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
const mixed = [10, "Hello", true, null, [1, 2]];
```

They can also contain objects, functions, or other arrays.

---

## Arrays Are Objects

```js
console.log(typeof []); // "object"
```

Arrays are specialized objects with array-specific behavior.

They have numeric indexes and a `length` property, but JavaScript does **not** guarantee that an array is implemented as a traditional contiguous-memory array.

> Focus on observable behavior rather than assuming a particular engine's internal memory layout.

---

## `length`

```js
const arr = [10, 20, 30];

console.log(arr.length); // 3
```

The `length` property is based on the highest array index plus one.

```js
arr[5] = 100;

console.log(arr.length); // 6
```

This creates empty slots between indexes `3` and `5`.

---

# 10. Adding and Removing Elements

## `push()`

Adds one or more elements to the **end**.

```js
const arr = [1, 2, 3];

arr.push(4);

console.log(arr); // [1, 2, 3, 4]
```

Returns the new array length.

---

## `pop()`

Removes the last element and returns it.

```js
const arr = [1, 2, 3];

const value = arr.pop();

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

Removes the first element and returns it.

```js
const first = arr.shift();
```

---

# 11. `slice()` vs `splice()`

## `slice()`

Returns a portion of an array **without changing the original**.

```js
const arr = [10, 20, 30, 40, 50];

const part = arr.slice(1, 4);

console.log(part); // [20, 30, 40]
console.log(arr);  // [10, 20, 30, 40, 50]
```

The end index is not included.

---

## `splice()`

Can **add, remove, or replace** elements at a specific position.

Remove:

```js
const arr = [10, 20, 30, 40];

arr.splice(1, 2);

console.log(arr); // [10, 40]
```

Here:

```text
start = 1
deleteCount = 2
```

Insert:

```js
arr.splice(1, 0, 20, 30);
```

Replace:

```js
arr.splice(1, 2, 200, 300);
```

> `splice()` mutates the original array.

### Easy way to remember

```text
slice  → copy/extract → does NOT mutate
splice → modify       → DOES mutate
```

---

# 12. Combining Arrays

## `concat()`

Returns a new array:

```js
const a = [1, 2];
const b = [3, 4];

const combined = a.concat(b);

console.log(combined); // [1, 2, 3, 4]
```

## Spread Operator `...`

Another common approach:

```js
const combined = [...a, ...b];
```

This creates a new array containing the elements of both arrays.

---

# 13. Searching Arrays

```js
const fruits = ["apple", "banana", "orange", "banana"];

console.log(fruits.indexOf("banana"));     // 1
console.log(fruits.lastIndexOf("banana")); // 3
console.log(fruits.indexOf("grape"));      // -1

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape"));  // false
```

Use:

- `indexOf()` when you need an index.
- `includes()` when you only need to know whether a value exists.

---

# 14. `sort()`

`sort()` sorts the array **in place** and returns the same array.

### Important JavaScript behavior

Without a comparison function, elements are sorted according to their string representations:

```js
const arr = [10, 2, 30, 4];

arr.sort();

console.log(arr); // [10, 2, 30, 4] in string-order terms
```

For numeric sorting:

```js
const ascending = [10, 2, 30, 4];

ascending.sort((a, b) => a - b);

console.log(ascending); // [2, 4, 10, 30]
```

Descending:

```js
ascending.sort((a, b) => b - a);
```

> Modern JavaScript specifies a **stable** sort, but the comparison function still determines the ordering logic.

---

# 15. `flat()`

Flattens nested arrays by a specified depth.

```js
const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat());
// [1, 2, 3, 4, [5]]

console.log(nested.flat(2));
// [1, 2, 3, 4, 5]
```

To flatten all levels:

```js
nested.flat(Infinity);
```

`flat()` returns a new array.

---

# 16. Array Iteration Methods

These methods are essential for working with real application data.

## `forEach()`

Runs a function for each element.

```js
const numbers = [1, 2, 3];

numbers.forEach((num) => {
    console.log(num);
});
```

> `forEach()` is for performing an action. It does not create a new transformed array.

---

## `map()`

Creates a new array by transforming every element.

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((num) => num * 2);

console.log(doubled); // [2, 4, 6]
```

Think:

```text
[1, 2, 3]
   ↓ map(x => x * 2)
[2, 4, 6]
```

---

## `filter()`

Creates a new array containing elements that pass a condition.

```js
const numbers = [1, 2, 3, 4, 5];

const even = numbers.filter((num) => num % 2 === 0);

console.log(even); // [2, 4]
```

---

## `find()`

Returns the **first element** that satisfies a condition.

```js
const numbers = [5, 12, 8, 20];

const result = numbers.find((num) => num > 10);

console.log(result); // 12
```

Returns `undefined` if nothing matches.

---

## `findIndex()`

Returns the index of the first matching element.

```js
const numbers = [5, 12, 8, 20];

console.log(numbers.findIndex((num) => num > 10));
// 1
```

Returns `-1` if nothing matches.

---

## `some()`

Checks whether **at least one** element satisfies a condition.

```js
const numbers = [1, 3, 5, 8];

console.log(numbers.some((num) => num % 2 === 0));
// true
```

---

## `every()`

Checks whether **all** elements satisfy a condition.

```js
const numbers = [2, 4, 6];

console.log(numbers.every((num) => num % 2 === 0));
// true
```

---

## `reduce()`

Reduces an array to a single value.

```js
const numbers = [10, 20, 30];

const sum = numbers.reduce((total, num) => total + num, 0);

console.log(sum); // 60
```

Think:

```text
10 + 20 + 30
      ↓
     60
```

### The four methods to master first

```text
map     → transform
filter  → select
find    → find one
reduce  → combine into one value
```

---

# 17. Common Array Methods — Quick Table

| Method | Purpose | Mutates original? |
|---|---|---|
| `push()` | Add to end | Yes |
| `pop()` | Remove from end | Yes |
| `unshift()` | Add to beginning | Yes |
| `shift()` | Remove from beginning | Yes |
| `slice()` | Extract a portion | No |
| `splice()` | Add/remove/replace | Yes |
| `concat()` | Combine arrays | No |
| `join()` | Convert to string | No |
| `sort()` | Sort elements | Yes |
| `flat()` | Flatten nested arrays | No |
| `forEach()` | Run code for each item | No* |
| `map()` | Transform items | No |
| `filter()` | Select matching items | No |
| `find()` | Find first match | No |
| `some()` | At least one match? | No |
| `every()` | Do all match? | No |
| `reduce()` | Reduce to one value | No |

\* `forEach()` itself does not mutate the array, but the callback can mutate objects or other external state.

---

# 18. Objects

## What is an Object?

An object stores related information as **key-value pairs**.

```js
const student = {
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

# 19. Creating Objects

```js
const person = {
    name: "Abhinav",
    age: 21,
    isStudent: true
};
```

An object can contain values of different types, including other objects, arrays, and functions.

---

# 20. Reading Properties

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
const key = "age";

console.log(person[key]);
```

---

# 21. Adding and Updating Properties

Add:

```js
person.city = "Delhi";
```

Update:

```js
person.age = 22;
```

Both use assignment syntax.

---

# 22. Deleting Properties

Use `delete`:

```js
delete person.city;
```

The property is removed.

---

# 23. Nested Objects and Arrays

```js
const student = {
    name: "Abhinav",
    marks: [90, 85, 92],
    address: {
        city: "Delhi",
        pin: 110001
    }
};
```

Access nested values:

```js
console.log(student.marks[0]);      // 90
console.log(student.address.city);  // "Delhi"
```

---

# 24. Object References

Objects are reference values.

```js
const obj1 = {
    name: "Abhinav"
};

const obj2 = obj1;

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

# 25. Useful Object Methods

## `Object.keys()`

Returns an array containing the object's own enumerable property names.

```js
const person = {
    name: "Abhinav",
    age: 21
};

console.log(Object.keys(person));
// ["name", "age"]
```

## `Object.values()`

```js
console.log(Object.values(person));
// ["Abhinav", 21]
```

## `Object.entries()`

Returns `[key, value]` pairs:

```js
console.log(Object.entries(person));
// [["name", "Abhinav"], ["age", 21]]
```

These are especially useful with loops and array methods.

---

# 26. Destructuring

Destructuring extracts values from arrays or properties from objects.

## Object destructuring

```js
const obj = { value: 13 };

const { value: userValue } = obj;

console.log(userValue); // 13
```

You can also use the same property name:

```js
const { name, age } = person;
```

## Array destructuring

```js
const students = ["Abhinav", "Rohit", "Mohit"];

const [first, second] = students;

console.log(first);  // "Abhinav"
console.log(second); // "Rohit"
```

---

# 27. Spread and Copying

The spread operator creates a **shallow copy** when used with arrays or objects.

```js
const original = {
    name: "Abhinav",
    age: 21
};

const copy = { ...original };

copy.age = 22;

console.log(original.age); // 21
console.log(copy.age);     // 22
```

But nested objects are still shared:

```js
const original = {
    user: {
        name: "Abhinav"
    }
};

const copy = { ...original };

copy.user.name = "Abhi";

console.log(original.user.name); // "Abhi"
```

This is why it is called a **shallow** copy.

For a structured deep clone:

```js
const deepCopy = structuredClone(original);
```

> `structuredClone()` is useful for many structured data types, but it is not a universal clone for every JavaScript value.

---

# 28. Optional Chaining

Optional chaining `?.` safely accesses a property when an intermediate value may be `null` or `undefined`.

```js
const user = {
    profile: {
        name: "Abhinav"
    }
};

console.log(user.profile?.name); // "Abhinav"
console.log(user.address?.city); // undefined
```

Without optional chaining, accessing `user.address.city` would throw because `user.address` is `undefined`.

---

# 29. Nullish Coalescing

The `??` operator provides a fallback only when the left side is `null` or `undefined`.

```js
const username = null;

console.log(username ?? "Guest");
// "Guest"
```

This differs from `||`:

```js
const count = 0;

console.log(count || 10); // 10
console.log(count ?? 10); // 0
```

Use `??` when `0`, `false`, or `""` are valid values and only `null`/`undefined` should trigger the fallback.

---

# 30. Symbols as Object Keys

A `Symbol` can be used as an object property key.

```js
const id = Symbol("id");

const user = {
    name: "Abhinav",
    [id]: 123
};

console.log(user[id]); // 123
```

Symbol-keyed properties are useful when you need unique property keys.

They are not returned by `Object.keys()`:

```js
console.log(Object.keys(user));
// ["name"]
```

---

# 31. Objects and Arrays Together

A very common real-world structure is an **array of objects**:

```js
const students = [
    { name: "Abhinav", age: 21 },
    { name: "Rohit", age: 22 },
    { name: "Mohit", age: 20 }
];
```

Access values:

```js
console.log(students[0].name); // "Abhinav"
console.log(students[1].age);  // 22
```

This pattern is extremely common when working with API responses and application data.

For example:

```js
const adults = students.filter((student) => student.age >= 21);

const names = students.map((student) => student.name);
```

This is where arrays + objects become genuinely useful.

---

# 32. A Note on Internal Implementation

JavaScript objects and arrays are implemented by the JavaScript engine using internal data structures and optimizations.

The exact representation is **engine-dependent**.

Do not treat a particular implementation detail—such as "all objects are hash maps" or "all arrays are contiguous memory"—as part of the JavaScript language specification.

For learning JavaScript, focus first on observable behavior:

```text
Object
  ↓
properties (key → value)
  ↓
read / add / update / delete

Array
  ↓
ordered collection
  ↓
indexed access + array methods
```

---

# 33. Arrays vs Objects

```text
Array
  ↓
Ordered collection
  ↓
Access commonly by numeric index

Object
  ↓
Collection of named properties
  ↓
Access by property key
```

Example:

```js
const fruits = ["Apple", "Banana", "Mango"];

const person = {
    name: "Abhinav",
    age: 21
};
```

Use an array when **order and a sequence of elements** are the main idea.

Use an object when **named properties describing a value/entity** are the main idea.

---

# 34. Quick Cheat Sheet

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
date.toISOString();
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
arr.includes();
arr.sort();
arr.flat();

arr.forEach();
arr.map();
arr.filter();
arr.find();
arr.findIndex();
arr.some();
arr.every();
arr.reduce();
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

## Modern syntax

```js
const { name, age } = person;
const [first, second] = students;

const copy = { ...person };
const merged = [...a, ...b];

user.profile?.name;
value ?? defaultValue;
structuredClone(obj);
```

---

# 35. Big Picture

```text
JavaScript Data
│
├── Numbers
│   ├── Number methods
│   └── Math object
│
├── Strings
│   ├── Template literals
│   ├── Searching
│   ├── Extracting
│   └── Transforming
│
├── Dates
│   ├── Date objects
│   ├── Components
│   └── Timestamps
│
├── Arrays
│   ├── Indexed data
│   ├── Add/remove
│   ├── Extract/modify
│   ├── Search
│   ├── Sort/flatten
│   └── map/filter/find/reduce
│
└── Objects
    ├── Key-value data
    ├── Nested data
    ├── CRUD operations
    ├── References
    ├── Destructuring
    ├── Spread/copying
    └── Object utility methods
```

---