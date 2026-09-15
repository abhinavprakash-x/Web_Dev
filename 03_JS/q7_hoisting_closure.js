"use strict";
// Hoisting / Memory Allocation Phase and Execution Phase

console.log(a); // undefined
var a = 10;
console.log(a); // 10

// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // 20


let globalVar = 30; // This will create a global variable

function greet() {
    console.log(globalVar);
}

greet(); // 30
console.log(globalVar); // 30

function greet2() {
    let localVar = 40;
    console.log(localVar); // 40
}

// console.log(localVar); // ReferenceError: localVar is not defined
greet2(); // 40


if(true) {
    let blockVar = 50;
    var blockVar2 = 60;
    console.log(blockVar); // 50
    console.log(blockVar2); // 60
}

// console.log(blockVar); // ReferenceError: blockVar is not defined
console.log(blockVar2); // 60


let num = 100;

function outerFunction() {
    let num = 200;
    console.log(num); // 200

    function innerFunction() {
        let num = 300;
        console.log(num); // 300
    }

    innerFunction();
}

console.log(num); // 100
outerFunction();


function counter() {
    let count = 0;
    function increment() {
        count++;
        return count;
    }
    return increment;
}

const myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3


// Closure Example Real World Scenario

function createBankAccount(initialBalance) {
    let balance = initialBalance;

    let account = {
        deposit: function(amount) {
            balance += amount;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient funds");
            }
        },
        getBalance: function() {
            return balance;
        }
    };

    return account;
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500

// This will throw a refernce error as balance is essentialy private to the createBankAccount function and cannot be accessed outside of it.
// balance = 2000;
// console.log(balance)
// console.log(myAccount.getBalance());

const anotherAccount = createBankAccount(500);
anotherAccount.withdraw(200);
console.log(anotherAccount.getBalance()); // 300
console.log(myAccount.getBalance()); // 1500

myAccount.balance = 2000; // This will not change the balance of myAccount as balance is private to the createBankAccount function
console.log(myAccount.getBalance()); // 1500


function func1(value) {
    return function func2(value2) {
        return value + value2;
    }
}

let add5 = func1(5);
console.log(add5, typeof add5);
console.log(add5(10)); // 15
console.log(add5(20)); // 25

let add6 = func1(6)(10);
console.log(add6, typeof add6); // 16