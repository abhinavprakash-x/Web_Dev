// Q1 — Data Types

let num = 423;
let num2 = 4.23;
num2 = 4.768;

if (true) {
    var num3 = 756;
}

console.log(typeof num, typeof num2, typeof num3);
console.log(num, num2, num3);

const num4 = 3.1415;
console.log(typeof num4, num4);

let name = "Abhinav";
console.log(typeof name, name);

let isPrime = true;
console.log(typeof isPrime, isPrime);

let undefinedValue;
console.log(typeof undefinedValue, undefinedValue);

let num5 = 785778527856827597758475893;
console.log(typeof num5, num5);

let num6 = 785778527856827597758475893n;
console.log(typeof num6, num6);

let nu = null;
console.log(typeof nu, nu);

let arr = [4, 4.23, nu, isPrime, name, num, true, num4];
console.log(typeof arr, arr);

let obj = {
    name: "Abhinav",
    age: 21
};

console.log(typeof obj, obj);

let sum = function add(a, b) {
    return a + b;
};

console.log(typeof sum, sum);
console.log(sum(5, 6));

let obj2 = obj;
obj2.age = 20;

console.log(obj, obj2);

let str = "Abhi";

str[0] = "X";
console.log(str);

str = "Abhinav";
console.log(str);

str = "XYZ";
console.log(str, name);