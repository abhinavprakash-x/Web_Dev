// Q3 — Conditions and Loops


// for loop

for (let i = 0; i < 10; ++i) {
    console.log(i);
}

// for each loop

let arr = [1, 2, 3, 4, 5];

arr.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
});

// for ...of loop

for (const value of arr) {
    console.log(value);
};

// while loop

let j = 3;

while (j < 17) {
    console.log(j);
    j += 3;
}


// do...while loop

let k = 0;

do {
    console.log(k);
    ++k;
} while (k < 10);


// if / else if / else

let age = 54;

if (age < 18) {
    console.log("No");
}
else if (age < 32) {
    console.log("Yes");
}
else {
    console.log("Ohhh");
}