function Counter({count, setCount}) {
    // const [count, setCount] = useState(0);
    // Instead of Creating it here we state Lift it to App()

    return (
        <>
            <h2>Counter is: {count}</h2>
            <button onClick={()=>setCount(count => count + 1)}>Increment</button>
            <button onClick={()=>setCount(count => count - 1)}>Decrement</button>
        </>
    )
}

export default Counter;