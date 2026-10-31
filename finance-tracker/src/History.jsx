function History({ transactions }) {

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    return (
        <div className="History">
            <h2>Transaction History</h2>

            {transactions.length === 0 ? (<p>No transactions yet.</p>) : (
                transactions.map(transaction => (
                    <div className="HistoryItem" key={transaction.id}>

                        <div className="HistoryDetails">
                            <h3>{transaction.description}</h3>
                            <p>{transaction.category}</p>
                            <small>{formatDate(transaction.date)}</small>
                        </div>

                        <div className={ transaction.type === "income" ? "IncomeAmount" : "ExpenseAmount"}>
                            {transaction.type === "income" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                        </div>

                    </div>
                ))
            )}
        </div>
    );
}

export default History;