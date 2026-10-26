# Memo = Memorize

## React Memo
```js
import React from "react";
const Sum = React.memo(()=>{
    function calc() {
        let sum = 0;
        for(let i = 0; i < 100; ++i)
            sum += i;

        return sum;
    }

    let total = calc();

    return (
        <>
            <h1>Sum: {sum}</h1>
        </>
    )
})

```
If this function was written normally and then called from inside another function
```js
App() {
    return (
        <>
            <Sum />
        </>
    )
}
```
Then whenever `App()` re renders the Sum function is called again even if there are no
changes there, making the code less efficient. But when React Memo is used the function
isn't called everytime `App()` re renders.

React Memo compares it's props(function args) and if they are unchanged then it doesn't
call the function again.

## useMemo
useMemo remembers the value (int/string) and takes a dependency array and only if
any var of dependency array is changed then the function is called again.
Other changes and re rendering of App() won't cause it run again.

```js
export default function App() {
    [num, setNum] = useState(100);

    const sum = useMemo(()=>{
        let sum = 0;

        for(let i = 0; i < num; ++i)
            sum += i;

        return sum;
    }, [num]);

    return (
        <>
            <h1>Sum: {sum}</h1>
            <button onClick={()=>setNum(num + 10)}>Increment num: {num}</button>
        </>
    )
}
```

## useCallback
If a function has another function then everytime the outside function rerenders the
inside function gets created again consuming memory, but it doesn't have to be created
again.
And to remember the function across re renders useCallback is used.

```js
export default function App() {
    const hclck = useCallback(()=>{
        console.log("Handle Clicks");
    }, [])
}
```

And it can change using it's dependency array
```js
export default function App() {
    [num, setNum] = useState(100);

    const hclck = useCallback(()=>{
        console.log("Handle Clicks: ", {num});
    }, [num]); // num will be fetched from it's outer locality

    return (
        <>
            <h1>Sum: {sum}</h1>
            <button onClick={()=>setNum(num + 10)}>Increment num: {num}</button>
        </>
    )
}
```

NOTE: But these memo (React.memo) fails when an object is passed to them through props.
Since Eveytime object is passed the object will have a different reference.
So it will re execute.
This can be solved by using useMemo to store the object and then pass that object.

## useRef Hook
useRef is used to store a value that doesn't cause re render when changed. It can be used
to store a DOM element reference or a variable that doesn't need to be re rendered.

```jsx
function App() {
	const [time, setTime] = useState(0);
	let intervalIdref = useRef(null);

	function handleStart() {
        if (intervalIdref.current) {
            return;
        }

		intervalIdref.current = setInterval(() => {
			setTime((time) => time + 1);
		}, 1000);
	}

	function handleStop() {
		clearInterval(intervalIdref.current);
        intervalIdref.current = null;
	}

	function handleReset() {
		clearInterval(intervalIdref.current);
        intervalIdref.current = null;
		setTime(0);
	}

	return (
		<div>
			<h1>Time: {time}</h1>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
}
```
The intervalIdref is an object with a property called current. The value of current can be changed without causing a re render. So it can be used to store the intervalId and then clear it when needed. This is useful when we want to start and stop a timer without causing unnecessary re renders of the component.
It is initialized only once and the value of current can be changed without causing a re render.

Also used in forms to prevent re render when the input value is changed. It can be used to store the input value and then use it when needed without causing a re render.

```jsx
function App() {
    const inputRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        alert(`Input value: ${inputRef.current.value}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
}
```