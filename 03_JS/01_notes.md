# JavaScript Notes

# Video 1: Introduction to JavaScript

## What is JavaScript?

JavaScript (JS) is a programming language commonly used to add **logic and interactivity** to web pages.

Browsers provide a JavaScript runtime that executes JavaScript code. In Chromium-based browsers, this runtime is **V8**, which is implemented primarily in C++.

Other major browser JavaScript engines include:

- **V8** → Chrome / Chromium-based browsers
- **SpiderMonkey** → Firefox
- **JavaScriptCore** → Safari

> JavaScript itself is standardized by **ECMAScript**. The browser runtime provides the engine plus browser APIs such as the DOM, timers, and networking.

### A more precise model

It is common to say that "browsers understand JavaScript", but more precisely:

```text
Browser
   ↓
JavaScript Engine
   ↓
Parses / compiles / executes JavaScript
```

Modern JavaScript engines do not simply interpret every line directly. They use parsing, compilation, and JIT (Just-In-Time) optimization techniques.

JavaScript is also not the only language that can run in a browser. Other languages can be compiled to **WebAssembly (Wasm)**, which browsers can execute through their WebAssembly runtime.

---

# Why JavaScript?

JavaScript was created in **1995** by **Brendan Eich** and was designed to bring scripting and interactivity to web pages.

Some important reasons JavaScript became successful:

1. Relatively easy to start with compared with many lower-level languages.
2. Safer for normal web scripting than giving web pages direct access to arbitrary memory, files, or hardware.
3. Runs directly in browsers, making it immediately useful for web development.
4. Supports automatic garbage collection.
5. Was designed for the computing environment and web applications of its time.

> The historical story is more complicated than simply "C++ was too powerful." JavaScript was designed specifically as a scripting language for the web, with different goals from C/C++.

---

# JavaScript Engines

A JavaScript engine is software that executes JavaScript.

### V8

Used by:

- Google Chrome
- Chromium
- Node.js
- Other environments based on V8

V8 is implemented primarily in C++.

### SpiderMonkey

Used by Firefox.

### JavaScriptCore

Used by Safari.

---

# Node.js

Node.js is a JavaScript runtime that uses **V8** and provides additional APIs for running JavaScript outside the browser.

```text
Browser
    ↓
V8 + Browser APIs
    ↓
JavaScript

Node.js
    ↓
V8 + Node.js APIs
    ↓
JavaScript
```

Node.js allows JavaScript to be used for servers, command-line programs, scripts, and tooling.

---

# Video 2: Variables and Data Types

JavaScript was created in **1995**, and Brendan Eich developed the first implementation in about **10 days**.

## Variables

A variable can be declared with `let`:

```js
let age = 21;
let name = "Abhinav";

console.log(age, name);
```

JavaScript is **dynamically typed**, so you do not specify a variable's type when declaring it.

A variable can later hold a value of another type:

```js
let value = 10;
value = "Hello";
```

---

# `const`

`const` creates a binding that cannot be reassigned:

```js
const pi = 3.1415;
```

This is invalid:

```js
pi = 4;
```

A `const` variable must be initialized when declared.

### Important

`const` does **not** make an object immutable:

```js
const user = {
    name: "Abhinav"
};

user.name = "Abhi"; // Allowed
```

The object can be changed; the variable simply cannot be reassigned to another object.

---

# `var`

The older way of declaring variables is:

```js
var age = 21;
```

`var` differs from `let` and `const`:

- It is function-scoped rather than block-scoped.
- It can be redeclared in the same scope.
- Its hoisting behavior differs from `let` and `const`.

For modern JavaScript, prefer `let` and `const`.

---

# Data Types in JavaScript

JavaScript values are commonly divided into:

```text
Primitive
    ↓
Objects
```

## Primitive Types

JavaScript has seven primitive types:

1. `number`
2. `string`
3. `boolean`
4. `undefined`
5. `bigint`
6. `symbol`
7. `null`

---

## 1. Number

JavaScript uses the `Number` type for ordinary numeric values:

```js
let a = 423;
let b = 4.23;
```

Unlike C/C++, JavaScript does not have separate ordinary `int` and `float` types.

`Number` uses IEEE 754 double-precision floating point.

The largest integer that can be represented **exactly** as a `Number` is:

```js
Number.MAX_SAFE_INTEGER
// 9007199254740991
// 2^53 - 1
```

For integers larger than this where exact integer arithmetic is required, use `BigInt`.

---

## 2. String

Represents text:

```js
let name = "Abhinav";
let city = "Delhi";
```

Strings are primitive values.

---

## 3. Boolean

Has two possible values:

```js
true
false
```

Example:

```js
let isPrime = true;
```

---

## 4. `undefined`

Represents a variable that has been declared but has not been assigned a value:

```js
let value;

console.log(value);
// undefined
```

---

## 5. `BigInt`

Used for integers larger than the range where `Number` can represent every integer exactly:

```js
let num = 7856786568568955364n;
```

The `n` makes it a `BigInt`.

---

## 6. `null`

Represents an intentional absence of a value:

```js
let user = null;
```

A famous JavaScript quirk:

```js
typeof null;
// "object"
```

This is historical behavior. `null` is still a **primitive value**.

---

## 7. Symbol

Symbols create unique primitive values:

```js
let id = Symbol("id");
```

Two separately created symbols are different:

```js
Symbol("id") === Symbol("id");
// false
```

---

# Objects

Everything that is not a primitive value is an **object** in JavaScript's type system.

Common object types include:

- Objects
- Arrays
- Functions
- Dates
- Maps
- Sets

---

## Arrays

Arrays are objects used to store ordered collections:

```js
let arr = [12, 2.6, "Abhinav", true];

console.log(arr);
```

Indexes start at `0`:

```js
arr[0];
arr[1];
```

---

## Objects

Objects store properties as key-value pairs:

```js
let obj = {
    name: "Abhinav",
    age: 21,
    canVote: true
};
```

Properties can be accessed with:

```js
obj.name;
obj["name"];
```

---

# Functions

Functions are callable objects:

```js
function print() {
    console.log("Hello");
}

print();
```

Functions can also be stored in variables:

```js
let add = function(a, b) {
    return a + b;
};

console.log(add(5, 6));
```

---

# `typeof`

Use `typeof` to inspect a value's type:

```js
console.log(typeof value);
```

Examples:

```js
typeof 10;          // "number"
typeof "Hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof 10n;         // "bigint"
typeof Symbol();    // "symbol"
typeof null;        // "object"  ← historical quirk
typeof [];          // "object"
typeof function(){} // "function"
```

Functions are objects internally, but `typeof` gives them the special result `"function"`.

---

# Primitive Immutability

Primitive values are **immutable**.

For example:

```js
let name = "Abhi";

name[0] = "X";

console.log(name);
// "Abhi"
```

The string itself was not modified.

However, the variable can be reassigned:

```js
name = "Abhinav";
```

So:

```text
Primitive value → immutable
Variable binding → can be reassigned with let
```

---

# Objects and References

Objects are mutable:

```js
let obj1 = {
    name: "Abhinav"
};

obj1.name = "Abhi";
```

When an object is assigned to another variable:

```js
let obj2 = obj1;
```

both variables refer to the **same object**:

```text
obj1 ─────┐
          ├──→ { name: "Abhi" }
obj2 ─────┘
```

Therefore:

```js
obj2.name = "Abhi";

console.log(obj1.name);
// "Abhi"
```

---

# Video 3: Memory Management — Stack vs Heap

## Important distinction

The simple rule:

```text
Primitive → Stack
Object → Heap
```

is a useful beginner's mental model, but it is **not a rule of the JavaScript language**.

JavaScript specifies behavior, not a required physical memory layout.

Engines such as V8 use implementation techniques including:

- stack frames
- heap allocation
- garbage collection
- tagged values
- object representations
- runtime optimizations

Therefore, exact storage details can vary by engine and optimization.

---

# Memory Basics

RAM is byte-addressable.

A memory address identifies a byte-sized location.

Low-level languages expose memory more directly. JavaScript normally hides these implementation details.

---

# 32-bit Address Space

A 32-bit address can represent:

```text
2^32
```

different addresses.

Therefore:

```text
2^32 bytes
= 4,294,967,296 bytes
≈ 4 GiB
```

A 32-bit address space can theoretically address up to **4 GiB of address space**.

> This does not mean every 32-bit OS can actually use 4 GiB of physical RAM. Hardware mappings and OS limitations can reduce usable memory.

---

# 64-bit Address Space

A 64-bit address theoretically provides:

```text
2^64
```

possible addresses.

That is:

```text
18,446,744,073,709,551,616 bytes
≈ 16 EiB
```

Actual CPUs and operating systems generally implement fewer than all 64 bits as usable address bits.

---

# Units

```text
1 nibble = 4 bits
1 byte  = 8 bits

1 KiB = 1024 bytes
1 MiB = 1024 KiB
1 GiB = 1024 MiB
1 TiB = 1024 GiB
1 PiB = 1024 TiB
1 EiB = 1024 PiB
1 ZiB = 1024 EiB
1 YiB = 1024 ZiB
```

---

# Garbage Collection

JavaScript engines have automatic **garbage collection**.

Objects that are no longer reachable from the program are eligible to be reclaimed.

```text
reachable object
      ↓
keep it

unreachable object
      ↓
eligible for garbage collection
```

The exact garbage-collection algorithm is engine-dependent.

---

# Pointer Tagging and Smis

JavaScript engines use internal representations to store values efficiently.

V8 uses techniques involving **tagged values**. Certain small integers have historically been represented efficiently as **Smis** ("small integers").

The exact bit layout and integer range are implementation details and can differ between engine versions and architectures.

The important idea is:

```text
Small/simple values
        ↓
can sometimes be represented efficiently as tagged values

Other values
        ↓
may require heap objects or other representations
```

Do not treat a specific "last bit" layout as a universal JavaScript rule.

---

# Video 4: Conditions, Loops and Operators

# Arithmetic Operators

```js
+
-
*
/
%
**
```

Examples:

```js
2 + 5;
5 - 2;
2 * 2;
6 / 3;
7 % 3;
7 ** 2;
```

## Assignment

```js
=
```

Example:

```js
let x = 5;
x = 10;
```

Compound assignment:

```js
+=
-=
*=
/=
%=
**=
```

Example:

```js
x += 5;
// same as x = x + 5
```

---

# Increment and Decrement

```js
x++;
++x;

x--;
--x;
```

Prefix increments before the value is used:

```js
let x = 5;

console.log(++x); // 6
console.log(x);   // 6
```

Postfix uses the old value first:

```js
let y = 5;

console.log(y++); // 5
console.log(y);   // 6
```

---

# Comparison Operators

```js
<
>
<=
>=
==
!=
===
!==
```

---

# `==` vs `===`

`==` performs type coercion in many cases:

```js
"7" == 7;
// true
```

`===` performs strict equality:

```js
"7" === 7;
// false
```

For modern JavaScript, prefer:

```js
===
!==
```

unless you intentionally want loose equality.

---

# Type Conversion

Explicit conversion:

```js
Number(value);
String(value);
Boolean(value);
```

Examples:

```js
Number(null);       // 0
Number(true);       // 1
Number(false);      // 0
Number(undefined);  // NaN
```

`NaN` means **Not-a-Number** and represents an invalid numeric result.

```js
Number("6784v");
// NaN

0 / 0;
// NaN
```

Interestingly:

```js
typeof NaN;
// "number"
```

---

# Floating-Point Precision

JavaScript `Number` uses binary floating-point representation.

Therefore:

```js
let c = 0.1;
let d = 0.2;

console.log(c + d);
```

can produce:

```text
0.30000000000000004
```

This is a consequence of representing many decimal fractions using binary floating point.

---

# Special Equality Cases

```js
null == undefined;
// true

null === undefined;
// false
```

Also:

```js
NaN === NaN;
// false

NaN == NaN;
// false
```

A reliable way to test for `NaN` is:

```js
Number.isNaN(value);
```

---

# Logical Operators

```js
&&
||
!
```

`&&` and `||` do not necessarily return `true` or `false`. They can return one of their operands.

---

## `&&` — AND

With booleans:

```js
true && true;
// true

true && false;
// false
```

With ordinary values:

```js
let a = "Rohit";
let b = "Mohit";

console.log(a && b);
// "Mohit"
```

If the first operand is falsy, `&&` returns it immediately.

If the first operand is truthy, it evaluates and returns the second operand.

This is called **short-circuit evaluation**.

---

## `||` — OR

If the first operand is truthy, `||` returns it.

Otherwise it returns the second operand.

```js
let a = "Rohit";
let b = "Mohit";

console.log(a || b);
// "Rohit"
```

---

## `!` — NOT

```js
!true;
// false

!false;
// true
```

---

# Conditions

```js
if (condition) {
    // code
}
```

Example:

```js
let age = 54;

if (age < 18) {
    console.log("No");
}
else if (age < 32) {
    console.log("Yes");
}
else {
    console.log("Ohhh");
}
```

Only the first matching branch is executed.

---

# Loops

## `for`

```js
for (let i = 0; i < 10; ++i) {
    console.log(i);
}
```

## `while`

```js
let j = 3;

while (j < 17) {
    console.log(j);
    j += 3;
}
```

## `do...while`

The body runs at least once because the condition is checked afterward:

```js
let k = 0;

do {
    console.log(k);
    ++k;
} while (k < 10);
```

---

# Quick Cheat Sheet

## Variables

```js
let x = 10;
const y = 20;
var z = 30; // legacy-style declaration
```

## Primitive Types

```text
number
string
boolean
undefined
bigint
symbol
null
```

## Common Objects

```text
object
array
function
```

## Type Checking

```js
typeof value;
```

## Arithmetic

```js
+ - * / % **
```

## Comparison

```js
< > <= >= == != === !==
```

## Logical

```js
&& || !
```

## Conditions

```js
if
else if
else
```

## Loops

```js
for
while
do...while
```

---

# Big Picture

```text
JavaScript
    │
    ├── Variables & Types
    │      ├── Primitive values
    │      └── Objects
    │
    ├── Operators
    │      ├── Arithmetic
    │      ├── Comparison
    │      ├── Assignment
    │      └── Logical
    │
    ├── Control Flow
    │      ├── if / else
    │      └── loops
    │
    └── Runtime
           ├── JavaScript engine
           ├── Memory management
           └── Garbage collection
```
