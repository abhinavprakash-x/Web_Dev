// Create

const newItem = document.createElement('h2');
newItem.textContent = 'This is a new item';

// newElement.className = "new-item";
// newElement.cllassName += " second";
newItem.classList.add('new-item');
newItem.classList.add('second');
// newElement.classList.remove('new-item');

newItem.style.color = 'red';
newItem.style.fontSize = '2rem';

const existingElement = document.getElementById('first');
existingElement.after(newItem);
// existingElement.before(newItem);

console.log(existingElement);
console.log(newItem);

console.log(newItem.getAttribute('class'));

const newItem2 = document.createElement('li');
newItem2.textContent = 'Item 4';
newItem2.style.color = 'green';
newItem2.style.fontSize = '1.5rem';

const list = document.getElementById('list');
// list.append(newItem2);
list.prepend(newItem2);

const newItem3 = document.createElement('li');
newItem3.textContent = 'Item 5';
newItem3.style.color = 'blue';
newItem3.style.fontSize = '1.5rem';

list.children[2].after(newItem3);

const arr = ["Milk", "Wheat", "Honey", "Rice", "Sugar"];
const fragment = document.createDocumentFragment();

const newItem4 = document.createElement('ol');
newItem4.style.color = 'purple';
newItem4.style.fontSize = '1.25rem';
newItem4.textContent = 'Grocery List:';

list.after(newItem4);

for(let item of arr) {
    const newItem = document.createElement('li');
    newItem.textContent = item;
    fragment.append(newItem);
}
newItem4.append(fragment);

// Delete

const deleteItem = document.getElementById('para');
deleteItem.remove();