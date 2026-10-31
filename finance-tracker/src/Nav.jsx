import "./App.css";

function Nav({ onOpenForm }) {
    return (
        <div className="Nav">
            <button className="btn" onClick={() => onOpenForm('income')}>Add Money</button>
            <button className="btn" onClick={() => onOpenForm('expense')}>Add Expense</button>
        </div>
    )
}

export default Nav;