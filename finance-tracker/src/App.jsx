import { createContext, useState } from "react";

import Cards from "./Cards.jsx";
import History from "./History.jsx";
import Nav from "./Nav.jsx";

import "./App.css";

export const IncomeContext = createContext(null);
export const BalanceContext = createContext(null);
export const ExpenseContext = createContext(null);

function App() {
    const [Income, setIncome] = useState(0);
    const [Balance, setBalance] = useState(0);
    const [Expense, setExpense] = useState(0);

    return (
        <>
            <IncomeContext value = {{Income, setIncome}}>
            <BalanceContext value = {{Balance, setBalance}}>
            <ExpenseContext value = {{Expense, setExpense}}>

                <div className="App">
                    <Nav />
                    <Cards />
                    <History />
                </div>

            </ExpenseContext>
            </BalanceContext>
            </IncomeContext>
        </>
    )
}

export default App;