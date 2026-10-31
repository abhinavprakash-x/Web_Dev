import { useContext } from "react";
import { IncomeContext, BalanceContext, ExpenseContext} from "./App";

function Cards() {
    const { Income } = useContext(IncomeContext);
    const { Balance } = useContext(BalanceContext);
    const { Expense } = useContext(ExpenseContext);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount);

    return (
        <div className="Cards">
            <div className="CardItem">
                <h2>Income</h2>
                <h2>{formatCurrency(Income)}</h2>
            </div>

            <div className="CardItem">
                <h2>Balance</h2>
                <h2>{formatCurrency(Balance)}</h2>
            </div>

            <div className="CardItem">
                <h2>Expense</h2>
                <h2>{formatCurrency(Expense)}</h2>
            </div>
        </div>
    );
}

export default Cards;