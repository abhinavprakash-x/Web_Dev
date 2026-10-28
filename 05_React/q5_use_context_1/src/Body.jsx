import Counter from "./Counter.jsx";

function Body({count, setCount}) {
    return (
        <>
            <h2>I am Body</h2>
            <Counter count={count} setCount={setCount} />
        </>
    );
}

export default Body;