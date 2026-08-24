// Q2 — Operators

// Arithmetic Operators

console.log(2 + 5);
console.log(5 - 2);
console.log(2 * 2);
console.log(6 / 3);
console.log(7 % 3);
console.log(7 ** 2);

let x = 5 + 3;
console.log(x);

console.log(++x); // Prefix: increment first, then use the value.
console.log(x++); // Postfix: use the value first, then increment.


// Comparison Operators

let y = 6;

console.log(x, y);
console.log(x > y);
console.log(x < y);
console.log(x == y);
console.log(x != y);

let sev1 = "7";
let sev2 = 7;
let sev3 = 7.0;

console.log(sev1 == sev2, sev1 == sev3, sev2 == sev3);
console.log(sev1 === sev2, sev1 === sev3, sev2 === sev3);


// Type Conversion and NaN

let a = "6784v";
let b = Number(a);

console.log(typeof b, b);
console.log(0 / 0);


// Floating-point precision

let c = 0.1;
let d = 0.2;
let e = c + d;

console.log(c, d, e);


// Equality quirks

console.log(null == undefined);
console.log(null === undefined);

console.log(null < 5);
console.log(null >= 0);

console.log(NaN === NaN);
console.log(NaN == NaN);


// Logical Operators

let a2 = "Rohit";
let b2 = "Mohit";

console.log(a2 && b2);