Video 5: JS Numbers and Math Object

obj.toFixed(n) -> returns string with rounded up value of obj upto n decimal points
obj.toPrecision(n) -> print n digits only
obj.toString() -> returns string

if you use new keyword to create any variable it will be created as an object
eg. let n = new Number(12);
    console.log(typeof n) <-- object

Non Primitive data when compared, compare their references,
Primitive data compare their own values.

Math Object
Math.abs(-4) -> 4
Math.PI -> 3.1415
Math.random() -> [0,1) gemerates a number between this interval

Common Formula
Math.floor(Math.random()*(max-min+1))+min
eg. Math.floor(Math.random()*(25-15+1))+15 -> Generates random num between 15-25


Video 6: JS Strings and Dates

String object:
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`; <-- Modern way since you can go on the next line with backticks but not with other two

you can also do "printf" (formatted print) using backticks by ``${var}``

str.length -> length
str.slice(start, end)
.... indexof, includes, trim, split etc. (see the code file)
.... more functions


Date object:

let time = new Date()
stores date/time in UTC format
console.log(time.toString()); <-- local time format

time.getHours(), ... etc. prints them in local time values

let time = new Date(year, month, date, hour, .....); custom date object

JS makes an API call to the OS asking for time which is stored as a number `Date.now()` and that number was 0 on 1 Jan 1970, 00:00 UTC
This number is called `TimeStamp`
India is UTC+0530 (5hrs 30mins ahead of UTC)