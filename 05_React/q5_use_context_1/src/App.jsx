import Header from "./Header.jsx";
import Body from "./Body.jsx";
import Footer from "./Footer.jsx";
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
	
	return (
		<>
			<Header count={count} />
			<Body count={count} setCount={setCount} />
			<Footer />
		</>
	)
}

export default App;