import { useContext } from "react";
import { IncomeContext, BalanceContext, ExpenseContext } from "./App";

function Cards() {
    const { Income } = useContext(IncomeContext);
    const { Balance } = useContext(BalanceContext);
    const { Expense } = useContext(ExpenseContext);

    return (
        <div>
            <div><h2>Income: {Income}</h2></div>
            <div><h2>Balance: {Balance}</h2></div>
            <div><h2>Expense: {Expense}</h2></div>
        </div>
    );
}

export default Cards;