function printMessage() {
    console.log("Hello, World!");
}

printMessage();
printMessage();


function addNumbers(num1, num2) {
    return num1 + num2;
}

const sum = addNumbers(5, 10);
console.log("The sum is: " + sum);
console.log(addNumbers(3, 7));

console.log(typeof printMessage, printMessage);
console.log(typeof addNumbers, addNumbers);

console.log(printMessage()); // This will print "Hello, World!" and then undefined because the function does not return a value.


function multiplyNumbers(num1, num2, num3=1) {
    return num1 * num2 * num3;
}

console.log(multiplyNumbers(2, 3)); // Uses default value for num3
console.log(multiplyNumbers(2, 3, 4)); // Overrides default value for num3

// Rest parameters example
function sumAll(...numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
}

console.log(sumAll(1, 2, 3, 4, 5)); // Outputs: 15

// Rest vs Spread example
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinedArray = [...arr1, ...arr2]; // Spread operator
console.log(combinedArray); // Outputs: [1, 2, 3, 4, 5, 6]

let numbersArray = [10, 20, 30, 40];
let [first, second, ...rest] = numbersArray; // Destructuring with rest
console.log(first, second, rest); // Outputs: 10 20 [30, 40]

// Function expressions and Hoisting example
// greet("Bob");

const greet = function(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice"));
console.log(typeof greet, greet);

console.log(greet2("Bob"));

function greet2(name) {
    return "Hello, " + name + "!";
}

// Arrow function example
const square = (num) => {
    return num * num;
};

const squareShort = num => num * num;

console.log(square(5)); // Outputs: 25
console.log(squareShort(6)); // Outputs: 36

const user = () => ({name: "John Doe", age: 30});
console.log(user());

// Immediately Invoked Function Expression (IIFE) example
(function() {
    console.log("This is an IIFE!");
})();

// Function callback example
function printResult(result) {
    console.log("The result is: " + result);
}

function calculate(num1, num2, callback) {
    const result = num1 + num2;
    callback(result);
}

calculate(10, 20, printResult);


function greet3(name, callback) {
    console.log(`${name}`);
    callback();
}

function sayHello() {
    console.log("Hello!");
}
function sayGoodbye() {
    console.log("Goodbye!");
}

greet3("Alice", sayHello);
greet3("Alice", sayGoodbye);