const form = document.getElementById('loveForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const boy = document.getElementById('boy').value.trim();
    const girl = document.getElementById('girl').value.trim();

    let l1 = boy.length;
    let l2 = girl.length;
    const lovePercentage = (l1 + l2) ** 7 % 101;
    
    result.textContent = `Love: ${lovePercentage}%`;
});