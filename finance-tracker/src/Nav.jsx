import "./App.css";

function Nav({ setIncomeForm, setExpenseForm }) {
    return (
        <div className="Nav">
            <button className="btn" onClick={() => setIncomeForm(true)}>
                Add Money
            </button>

            <button className="btn" onClick={() => setExpenseForm(true)}>
                Add Expense
            </button>
        </div>
    );
}

export default Nav;
