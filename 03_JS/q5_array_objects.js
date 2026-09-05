// Q5 — Arrays and Objects


// ==============================
// ARRAYS
// ==============================

// Creating an array
let arr = [10, 20, 30, 40];

console.log(arr);
console.log(arr[0]);
console.log(arr[2]);
console.log(arr.length);


// Arrays can store different types
let mixed = [10, "Hello", true, null, [1, 2]];

console.log(mixed);
console.log(typeof mixed); // "object"


// Updating an element
arr[1] = 99;
console.log(arr);


// push() — add to the end
arr.push(50);
console.log(arr);


// pop() — remove from the end
let last = arr.pop();
console.log(last);
console.log(arr);


// unshift() — add to the beginning
arr.unshift(5);
console.log(arr);


// shift() — remove from the beginning
let first = arr.shift();
console.log(first);
console.log(arr);


// slice() — extract part of an array without modifying the original
let numbers = [10, 20, 30, 40, 50];

let part = numbers.slice(1, 4);

console.log(part);
console.log(numbers);


// splice() — remove elements
let values = [10, 20, 30, 40, 50];

values.splice(1, 2);

console.log(values);


// splice() — insert elements
values.splice(1, 0, 20, 30);

console.log(values);


// splice() — replace elements
values.splice(1, 2, 200, 300);

console.log(values);


// concat() — combine arrays
let a = [1, 2];
let b = [3, 4];

let combined = a.concat(b);

console.log(combined);


// Spread operator — another way to combine arrays
let combined2 = [...a, ...b];

console.log(combined2);


// toString() and join()
let nums = [1, 2, 3];

console.log(nums.toString());
console.log(nums.join("-"));

// indexOf() and lastIndexOf()
let fruits = ["apple", "banana", "orange", "banana"];

console.log(fruits.indexOf("banana"));
console.log(fruits.lastIndexOf("banana"));
console.log(fruits.indexOf("grape")); // -1 (not found)
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false

// sort() — default behavior is string-based
let sortExample = [10, 2, 30, 4];

sortExample.sort();

console.log(sortExample);


// Numeric sorting
let ascending = [10, 2, 30, 4];

ascending.sort((a, b) => a - b);

console.log(ascending);


// Descending numeric sorting
let descending = [10, 2, 30, 4];

descending.sort((a, b) => b - a);

console.log(descending);


// flat() — flatten nested arrays
let nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat());
console.log(nested.flat(2));


// ==============================
// OBJECTS
// ==============================

// Creating an object
let person = {
    name: "Abhinav",
    age: 21,
    isStudent: true
};

console.log(person);


// Reading properties — dot notation
console.log(person.name);
console.log(person.age);


// Reading properties — bracket notation
console.log(person["name"]);

let key = "age";

console.log(person[key]);


// Adding a property
person.city = "Delhi";

console.log(person);


// Updating a property
person.age = 22;

console.log(person);


// Deleting a property
delete person.city;

console.log(person);


// Nested object
let student = {
    name: "Abhinav",

    marks: [90, 85, 92],

    address: {
        city: "Delhi",
        pin: 110001
    }
};

console.log(student.marks[0]);
console.log(student.address.city);


// Object references
let obj1 = {
    name: "Abhinav"
};

let obj2 = obj1;

obj2.name = "Abhi";

console.log(obj1);
console.log(obj2);
console.log(obj1 === obj2); // true


// Different objects with the same contents are not equal by reference
let obj3 = {
    value: 10
};

let obj4 = {
    value: 10
};

console.log(obj3 === obj4); // false


// Object.keys()
console.log(Object.keys(person));


// Object.values()
console.log(Object.values(person));


// Object.entries()
console.log(Object.entries(person));


// ==============================
// ARRAY OF OBJECTS
// ==============================

let students = [
    {
        name: "Abhinav",
        age: 21
    },

    {
        name: "Rohit",
        age: 22
    },

    {
        name: "Mohit",
        age: 20
    }
];

console.log(students);

console.log(students[0].name);
console.log(students[1].age);