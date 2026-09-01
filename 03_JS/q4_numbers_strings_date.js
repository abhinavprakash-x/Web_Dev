let a = 10;
let b = 34.26785;

console.log(a, b);
console.log(b.toFixed(1), b.toFixed(3));
console.log(b.toPrecision(2), b.toPrecision(4));

console.log(typeof a.toString(), a.toString());

let c = new Number(12);
console.log(typeof c, c);

console.log(Math.abs(-5));
console.log(Math.ceil(4.2));
console.log(Math.floor(4.8));
console.log(Math.round(4.5));
console.log(Math.max(1, 2, 3, 4, 5));
console.log(Math.min(1, 2, 3, 4, 5));
console.log(Math.pow(2, 3));
console.log(Math.sqrt(16));
console.log(Math.random());
console.log(Math.PI);

let min = 15;
let max = 25;
console.log(Math.floor(Math.random()*(max-min+1))+min);


let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`;
let str4 = `Hello
World`;

console.log(str1, str2, str3, str4);

let num1 = 10;
let str5 = `The number is ${num1}`;
console.log(str5);

console.log(str1.length);
console.log(str1.toUpperCase());
console.log(str1.toLowerCase());

console.log(str1.charAt(1));
console.log(str1[3]);
console.log(str1.indexOf('l'));
console.log(str1.lastIndexOf('l'));

console.log(str1.includes('lo'));
console.log(str1.startsWith('He'));
console.log(str1.endsWith('lo'));

console.log(str1.slice(1, 4));
console.log(str1.slice(-3));
console.log(str1.substring(1, 4));

let str6 = str1 + " " + str2;
console.log(str6);
let str7 = str1.concat(' ', str2);
console.log(str7);

let str8 = "Abhinav,AA,BB,CC,DD";
console.log(str8.split(''));
console.log(str8.split(','));
console.log(str8.replace('Abhinav', 'John'));
console.log(str8.replaceAll('A', 'o'));
console.log(str8.replace('A', 'o'));

let str9 = "   Hello World   ";
console.log(str9.trim());
console.log(str9.trimStart());
console.log(str9.trimEnd());

let time = new Date();
console.log(time);
console.log(time.toString());

console.log(time.getFullYear());
console.log(time.getMonth() + 1);
console.log(time.getDate());
console.log(time.getDay());

console.log(time.getHours());
console.log(time.getMinutes());
console.log(time.getSeconds());

let date1 = new Date(2020, 11, 25, 10, 30, 0);
console.log(date1.toString());

let date2 = new Date(0);
let date3 = new Date(1788265570113);
let date4 = Date.now();

console.log(date2.toString());
console.log(date3.toString());
console.log(date4.toString());