import {useState} from "react";

export default function App() {
    let [count, setCount] = useState(0);

    function incr() {
        setCount(count + 1);
    }

    return (
        <>
            <p>Counter: {count}</p>
            <button onClick={incr}>Increment</button>
        </>
    );
}