import { useContext } from "react";
import { CounterContext } from "./App";

function Counter() {
    const {count,setCount} = useContext(CounterContext);
    return (
        <>
            <h2>Counter is: {count}</h2>
            <button onClick={()=>setCount(count => count + 1)}>Increment</button>
            <button onClick={()=>setCount(count => count - 1)}>Decrement</button>
        </>
    )
}

export default Counter;
// Retrieve Context here directly.