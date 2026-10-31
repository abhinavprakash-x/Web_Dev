import { createContext, useState } from "react";

import Cards from "./Cards.jsx";
import History from "./History.jsx";
import Nav from "./Nav.jsx";
import IncomeForm from "./IncomeForm.jsx"
import ExpenseForm from "./ExpenseForm.jsx"

import "./App.css";

export const IncomeContext = createContext(null);
export const BalanceContext = createContext(null);
export const ExpenseContext = createContext(null);

function App() {
    const [Income, setIncome] = useState(0);
    const [Expense, setExpense] = useState(0);

    const Balance = Income - Expense;
    
    const [activeIncomeForm , setIncomeForm] = useState(false);
    const [activeExpenseForm , setExpenseForm] = useState(false);

    function addIncome(data) {
        setIncome(prev => prev + data.amount);
        Balance = Income - Expense;
    }

    function addExpense(data) {
        setExpense(prev => prev + data.amount);
        Balance = Income - Expense;
    }

    return (
        <>
            <IncomeContext value = {{Income, setIncome}}>
            <BalanceContext value = {{Balance}}>
            <ExpenseContext value = {{Expense, setExpense}}>

                <div className="App">
                    <Nav setIncomeForm={setIncomeForm} setExpenseForm={setExpenseForm} />
                    <Cards />
                    <History />
                </div>

                {activeIncomeForm && (
                    <div className="Modal">
                        <IncomeForm
                            addIncome={addIncome}
                            closeForm={() => setIncomeForm(false)}
                        />
                    </div>
                )}

                {activeExpenseForm && (
                    <div className="Modal">
                        <ExpenseForm
                            addExpense={addExpense}
                            closeForm={() => setExpenseForm(false)}
                        />
                    </div>
                )}

            </ExpenseContext>
            </BalanceContext>
            </IncomeContext>
        </>
    )
}

export default App;