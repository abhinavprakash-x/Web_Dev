import { createContext, useState } from "react";

import Cards from "./Cards.jsx";
import History from "./History.jsx";
import Nav from "./Nav.jsx";
import Form from "./Form.jsx";

import "./App.css";

export const IncomeContext = createContext(null);
export const BalanceContext = createContext(null);
export const ExpenseContext = createContext(null);

function addTransaction(data) {
    if (data.type === "income") {
        setIncome(prev => prev + data.amount);
        setBalance(prev => prev + data.amount);
    }
    else {
        setExpense(prev => prev + data.amount);
        setBalance(prev => prev - data.amount);
    }
}

function App() {
    const [Income, setIncome] = useState(0);
    const [Balance, setBalance] = useState(0);
    const [Expense, setExpense] = useState(0);

    const [activeForm , setActiveForm] = useState(null);

    return (
        <>
            <IncomeContext value = {{Income, setIncome}}>
            <BalanceContext value = {{Balance, setBalance}}>
            <ExpenseContext value = {{Expense, setExpense}}>

                <div className="App">
                    <Nav onOpenForm={setActiveForm} />
                    <Cards />
                    <History />
                </div>

                {activeForm &&
                    <Form type={activeForm} onCloseForm={()=>setActiveForm(null)} onAddTransaction={addTransaction} />}

            </ExpenseContext>
            </BalanceContext>
            </IncomeContext>
        </>
    )
}

export default App;