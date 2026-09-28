let solutions = {
    q1: 'Paris',
    q2: '4',
    q3: 'Jupiter',
    q4: 'H2O',
    q5: 'Pacific Ocean'
};

const form = document.getElementById('quizForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let score = 0;
    let formData = new FormData(form);

    for (let [name, value] of formData.entries()) {
        if (solutions[name] === value) {
            score++;
        }
    }
    alert(`Your score is: ${score}/${Object.keys(solutions).length}`);
    form.reset();
});