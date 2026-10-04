// 'use strict';

let obj1 = {
  name: "Abhinav",
  role: "Developer",
  greet: function () {
    console.log(`Hello, I am ${this.name} and I am a ${this.role}`);
  }
};

let obj2 = {
  name: "John",
  role: "Designer"
};

obj1.greet(); // Hello, I am Abhinav and I am a Developer
// obj2.greet(); // TypeError: obj2.greet is not a function

obj2.__proto__ = obj1; // Setting the prototype of obj2 to obj1
obj2.greet(); // Hello, I am John and I am a Designer


class Person {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

    greet() {
    console.log(`Hello, I am ${this.name} and I am a ${this.role}`);
  }
}

let person1 = new Person("Alice", "Manager");
person1.greet(); // Hello, I am Alice and I am a Manager

console.log(person1);

class Employee extends Person {
  constructor(name, role, department) {
    super(name, role); // Call the parent class constructor
    this.department = department;
  }

    gret() {
    console.log(`Hello, I am ${this.name}, a ${this.role} in the ${this.department} department`);
    }
};

let person2 = new Employee("Bob", "Engineer", "Development");
person2.gret(); // Hello, I am Bob, a Engineer in the Development department
person2.greet(); // Hello, I am Bob and I am a Engineer

let person3 = Object.create(person1); // Creating a new object with person1 as its prototype
person3.name = "Charlie";
person3.greet(); // Hello, I am Charlie and I am a Manager

function potato() {
    console.log("I am a potato with a name: " + this.name);
}

let potato1 = {
    name: "Potato1"
};

let potato2 = {
    name: "Potato2"
};

potato(); // I am a potato with a name: undefined
potato.call(potato1); // I am a potato with a name: Potato1
potato.call(potato2); // I am a potato with a name: Potato2

function mango(name, color) {
    this.name = name;
    this.color = color;
    console.log("I am a mango with a name: " + this.name + " and a color: " + this.color);
}

let mango1 = {
    name: "Mango1",
    color: "Yellow"
};

let mango2 = {
    name: "Mango2",
    color: "Green"
};

mango(); // I am a mango with a name: undefined and a color: undefined
mango.call(mango1, "Man1", "Yellow"); // I am a mango with a name: Man1 and a color: Yellow
mango.call(mango2, "Man2", "Green"); // I am a mango with a name: Man2 and a color: Green

mango.apply(mango1, ["Mangoose", "Red"]); // I am a mango with a name: Mangoose and a color: Red
mango.apply(mango2, ["Masoose", "Blue"]); // I am a mango with a name: Masoose and a color: Blue
console.log(mango1); // { name: 'Mangoose', color: 'Red' }

let boundMango = mango.bind(mango1, "BindMango", "BindColor");
console.log(mango1); // { name: 'Mangoose', color: 'Red' }
boundMango(); // I am a mango with a name: BindMango and a color: BindColor