const area = document.getElementById('right');
const button = document.getElementById('button');

button.addEventListener('click', () => {
    let task = document.getElementById('input');

    let newTask = document.createElement('div');
    let text = document.createElement('p');
    text.textContent = task.value;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', () => {
        newTask.remove();
    });

    let doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.classList.add('done');

    doneButton.addEventListener('click', () => {
        if(doneButton.textContent === 'Done') {
            doneButton.textContent = 'Undone';
            text.style.textDecoration = 'line-through';
        } else {
            doneButton.textContent = 'Done';
            text.style.textDecoration = 'none';
        }
    });

    newTask.appendChild(text);
    newTask.appendChild(doneButton);
    newTask.appendChild(deleteButton);
    newTask.classList.add('item');

    area.appendChild(newTask);
    task.value = '';
});