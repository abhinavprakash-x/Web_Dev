const button = document.getElementById('calculateButton');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const income = parseInt(document.getElementById('income').value);
    let taxRate;

    if (income < 0) {
        alert('Income cannot be negative.');
        return;
    }

    if (income <= 1275000) {
        taxRate = 0;
    } else if (income <= 1600000) {
        taxRate = 0.15;
    } else if (income <= 2000000) {
        taxRate = 0.20;
    } else if (income <= 2400000) {
        taxRate = 0.25;
    } else {
        taxRate = 0.30;
    }
    
    const taxAmount = income * taxRate;
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Your income tax is: ${taxAmount.toFixed(2)}`;
});