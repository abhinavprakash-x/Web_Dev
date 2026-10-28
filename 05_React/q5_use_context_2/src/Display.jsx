import { useContext } from "react";
import { CounterContext } from "./App";

function Display() {
    const {count} = useContext(CounterContext);
    return (
        <>
            <h2>Header Count: {count}</h2>
        </>
    )
}

export default Display;
// Display is a Consumer so it will use useContext Hook
// const values = useContext(counterContext)
// values: {count, setCount}

// const { count } = useContext(counterContext)
// only count