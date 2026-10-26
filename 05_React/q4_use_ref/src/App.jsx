import { useState } from 'react';
import { useRef } from 'react';

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

export default App