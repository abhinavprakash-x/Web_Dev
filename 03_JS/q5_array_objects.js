// Q5 — Arrays and Objects
// Practice file for JavaScript fundamentals
// Topics: arrays, array methods, objects, references, destructuring, copying

"use strict";

// ============================================================
// ARRAYS
// ============================================================

// Creating an array
const arr = [10, 20, 30, 40];

console.log("Original array:", arr);
console.log("First element:", arr[0]);
console.log("Third element:", arr[2]);
console.log("Length:", arr.length);


// Arrays can store values of different types
const mixed = [10, "Hello", true, null, [1, 2]];

console.log("Mixed array:", mixed);
console.log("typeof mixed:", typeof mixed); // "object"


// Updating an element
arr[1] = 99;
console.log("After update:", arr);


// push() — add to the end
arr.push(50);
console.log("After push:", arr);


// pop() — remove from the end
const last = arr.pop();

console.log("Popped value:", last);
console.log("After pop:", arr);


// unshift() — add to the beginning
arr.unshift(5);
console.log("After unshift:", arr);


// shift() — remove from the beginning
const first = arr.shift();

console.log("Shifted value:", first);
console.log("After shift:", arr);


// ============================================================
// SLICE AND SPLICE
// ============================================================

// slice() — extract part without modifying the original
const numbers = [10, 20, 30, 40, 50];

const part = numbers.slice(1, 4);

console.log("slice():", part);
console.log("Original after slice():", numbers);


// splice() — remove elements
const values = [10, 20, 30, 40, 50];

values.splice(1, 2);

console.log("After splice() remove:", values);


// splice() — insert elements
values.splice(1, 0, 20, 30);

console.log("After splice() insert:", values);


// splice() — replace elements
values.splice(1, 2, 200, 300);

console.log("After splice() replace:", values);


// ============================================================
// COMBINING ARRAYS
// ============================================================

const a = [1, 2];
const b = [3, 4];

const combined = a.concat(b);

console.log("concat():", combined);


// Spread operator — another way to combine arrays
const combined2 = [...a, ...b];

console.log("Spread:", combined2);


// ============================================================
// SEARCHING ARRAYS
// ============================================================

const fruits = ["apple", "banana", "orange", "banana"];

console.log("indexOf():", fruits.indexOf("banana"));
console.log("lastIndexOf():", fruits.lastIndexOf("banana"));
console.log("Missing value:", fruits.indexOf("grape")); // -1

console.log("includes() banana:", fruits.includes("banana")); // true
console.log("includes() grape:", fruits.includes("grape"));  // false


// ============================================================
// SORTING AND FLATTENING
// ============================================================

// sort() — default behavior is string-based
const sortExample = [10, 2, 30, 4];

sortExample.sort();

console.log("Default sort():", sortExample);


// Numeric sorting
const ascending = [10, 2, 30, 4];

ascending.sort((x, y) => x - y);

console.log("Ascending:", ascending);


// Descending numeric sorting
const descending = [10, 2, 30, 4];

descending.sort((x, y) => y - x);

console.log("Descending:", descending);


// flat() — flatten nested arrays
const nested = [1, [2, 3], [4, [5]]];

console.log("flat(1):", nested.flat());
console.log("flat(2):", nested.flat(2));
console.log("flat(Infinity):", nested.flat(Infinity));


// ============================================================
// ARRAY ITERATION METHODS
// ============================================================

const nums = [1, 2, 3, 4, 5];


// forEach() — perform an action for every element
nums.forEach((num) => {
    console.log("forEach:", num);
});


// map() — transform every element
const doubled = nums.map((num) => num * 2);

console.log("map() doubled:", doubled);


// filter() — keep elements that satisfy a condition
const evenNumbers = nums.filter((num) => num % 2 === 0);

console.log("filter() even:", evenNumbers);


// find() — first matching element
const firstGreaterThanThree = nums.find((num) => num > 3);

console.log("find() > 3:", firstGreaterThanThree);


// findIndex() — index of first matching element
const firstEvenIndex = nums.findIndex((num) => num % 2 === 0);

console.log("findIndex() even:", firstEvenIndex);


// some() — does at least one element match?
const hasLargeNumber = nums.some((num) => num > 10);

console.log("some() > 10:", hasLargeNumber);


// every() — do all elements match?
const allPositive = nums.every((num) => num > 0);

console.log("every() > 0:", allPositive);


// reduce() — combine all elements into one value
const sum = nums.reduce((total, num) => total + num, 0);

console.log("reduce() sum:", sum);


// A practical example: average
const average = nums.reduce((total, num) => total + num, 0) / nums.length;

console.log("Average:", average);


// ============================================================
// OBJECTS
// ============================================================

// Creating an object
const person = {
    name: "Abhinav",
    age: 21,
    isStudent: true
};

console.log("Person:", person);


// Reading properties — dot notation
console.log("Name:", person.name);
console.log("Age:", person.age);


// Reading properties — bracket notation
console.log("Name:", person["name"]);

const key = "age";

console.log("Dynamic key:", person[key]);


// Adding a property
person.city = "Delhi";

console.log("After adding city:", person);


// Updating a property
person.age = 22;

console.log("After updating age:", person);


// Deleting a property
delete person.city;

console.log("After deleting city:", person);


// ============================================================
// NESTED OBJECTS AND ARRAYS
// ============================================================

const student = {
    name: "Abhinav",
    marks: [90, 85, 92],
    address: {
        city: "Delhi",
        pin: 110001
    }
};

console.log("First mark:", student.marks[0]);
console.log("City:", student.address.city);


// Optional chaining
console.log("Country:", student.address?.country); // undefined


// Nullish coalescing
const country = student.address?.country ?? "India";

console.log("Country with fallback:", country);


// ============================================================
// OBJECT REFERENCES
// ============================================================

const obj1 = {
    name: "Abhinav"
};

const obj2 = obj1;

obj2.name = "Abhi";

console.log("obj1:", obj1);
console.log("obj2:", obj2);
console.log("Same reference:", obj1 === obj2); // true


// Different objects with the same contents are NOT equal by reference
const obj3 = {
    value: 10
};

const obj4 = {
    value: 10
};

console.log("Different objects:", obj3 === obj4); // false


// ============================================================
// OBJECT UTILITY METHODS
// ============================================================

console.log("Object.keys():", Object.keys(person));
console.log("Object.values():", Object.values(person));
console.log("Object.entries():", Object.entries(person));


// ============================================================
// DESTRUCTURING
// ============================================================

// Object destructuring
const user = {
    username: "abhinav",
    score: 95
};

const { username, score } = user;

console.log("Destructured username:", username);
console.log("Destructured score:", score);


// Rename during destructuring
const { username: nameFromObject } = user;

console.log("Renamed property:", nameFromObject);


// Array destructuring
const students = ["Abhinav", "Rohit", "Mohit"];

const [firstStudent, secondStudent] = students;

console.log("First student:", firstStudent);
console.log("Second student:", secondStudent);


// ============================================================
// SHALLOW COPY VS DEEP COPY
// ============================================================

const original = {
    name: "Abhinav",
    address: {
        city: "Delhi"
    }
};


// Shallow copy
const shallowCopy = { ...original };

shallowCopy.name = "Abhi";

console.log("Original name:", original.name);  // "Abhinav"
console.log("Copied name:", shallowCopy.name); // "Abhi"


// Nested object is still shared
shallowCopy.address.city = "Kolkata";

console.log(
    "Original city after shallow copy:",
    original.address.city
); // "Kolkata"


// Deep copy of supported structured-cloneable data
const deepCopy = structuredClone(original);

deepCopy.address.city = "Mumbai";

console.log(
    "Original city after deep copy:",
    original.address.city
); // "Kolkata"

console.log(
    "Deep copy city:",
    deepCopy.address.city
); // "Mumbai"


// ============================================================
// SYMBOL KEYS
// ============================================================

const id = Symbol("id");

const symbolUser = {
    name: "Abhinav",
    [id]: 123
};

console.log("Symbol property:", symbolUser[id]);


// Symbol-keyed properties are not returned by Object.keys()
console.log("Object.keys(symbolUser):", Object.keys(symbolUser));


// ============================================================
// ARRAY OF OBJECTS — REAL-WORLD PATTERN
// ============================================================

const studentList = [
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

console.log("Students:", studentList);

console.log("First student:", studentList[0].name);
console.log("Second student's age:", studentList[1].age);


// Get all student names
const studentNames = studentList.map((student) => student.name);

console.log("Student names:", studentNames);


// Get students with marks >= 85
const highScorers = studentList.filter(
    (student) => student.marks >= 85
);

console.log("High scorers:", highScorers);


// Find the first student with marks >= 90
const topStudent = studentList.find(
    (student) => student.marks >= 90
);

console.log("First top student:", topStudent);


// Calculate total marks
const totalMarks = studentList.reduce(
    (total, student) => total + student.marks,
    0
);

console.log("Total marks:", totalMarks);


// Calculate average marks
const averageMarks = totalMarks / studentList.length;

console.log("Average marks:", averageMarks);


// Sort students by marks — highest first
const studentsByMarks = [...studentList].sort(
    (a, b) => b.marks - a.marks
);

console.log("Students by marks:", studentsByMarks);