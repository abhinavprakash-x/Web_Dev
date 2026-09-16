// forEach

const numbers = [1, 2, 3, 4, 5, "A"];

numbers.forEach((number, index, arr) => {
  console.log(number, index, arr);
});

// filter

const numbers2 = [1, 2, 3, 4, 5, "A"];

const filteredNumbers = numbers2.filter(number => {
  return typeof number === "number";
});

console.log(filteredNumbers);

const arr = [1, 2, 3, 4, 5, "A", "B", "C", 6, 7, 8, 9, 10];

callback = (number) => {
  return typeof number === "number";
}

Array.prototype.filtering = function (callback) {
  const filteredArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArr.push(this[i]);
    }
  }
  return filteredArr;
}

const result = arr.filtering(callback);
console.log(result);

const result2 = arr.filtering((number) => {
  return typeof number === "string";
});
console.log(result2);

// map

const numbers3 = [1, 2, 3, 4, 5];
const result3 = numbers3.map((number) => number * 2);
console.log(result3);

const products = [
  { name: "Laptop", price: 1000, type: "Electronics" },
  { name: "Phone", price: 500, type: "Electronics" },
  { name: "Tablet", price: 300, type: "Electronics" },
    { name: "Shirt", price: 50, type: "Clothing" },
    { name: "Pants", price: 100, type: "Clothing" },
    { name: "Shoes", price: 200, type: "Clothing" },
    { name: "Watch", price: 150, type: "Accessories" },
    { name: "Bag", price: 250, type: "Accessories" },
    { name: "Belt", price: 75, type: "Accessories" },
];

const productlist = products.filter((product) => product.price >= 200).sort((a, b) => a.price - b.price);
console.log(productlist);

const productDetails = products.map((product) => ({name: product.name, price: product.price}));
console.log(productDetails);

// reduce

const numbers4 = [1, 2, 3, 4, 5];
const sum = numbers4.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);

// set data structure

const set = new Set();
set.add(1);
set.add(2);
set.add(2);
console.log(set);

const arr1 = [1, 2, 3, 4, 5, 1, 2, 3];
const set2 = new Set(arr1);
console.log(set2);

console.log(set2.has(1));
console.log(set2.has(6));
console.log(set2.size);

set2.delete(1);
console.log(set2);
set2.clear();
console.log(set2);

const arr2 = [...set];
console.log(arr2);

// map data structure

const map = new Map();
map.set("name", "John");
map.set("age", 30);
map.set("city", "New York");

console.log(map);

console.log(map.get("name"));
console.log(map.has("age"));
console.log(map.size);

map.delete("city");
console.log(map);
map.clear();
console.log(map);

const map2 = new Map([
  [true, "John"],
  ["age", 30],
  ["city", "New York"],
  [2, "Two"],
  [[1,2,3], "Array Key"]
]);

console.log(map2);