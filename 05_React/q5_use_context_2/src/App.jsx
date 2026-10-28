import Header from "./Header.jsx";
import Body from "./Body.jsx";
import Footer from "./Footer.jsx";
import { useState, createContext } from "react";

export const CounterContext = createContext();

function App() {
    const [count, setCount] = useState(0);
	
	return (
		<>
		<CounterContext value={{count, setCount}}>
			<Header />
			<Body />
			<Footer />
		</CounterContext>
		</>
	)
}

export default App;
// App Becomes Producer for useContext Hook by using createContext
// and every function inside the scope of <counterContext>......</counterContext>
// in the ... area i.e. Header Body and Footer can use it without prop drilling.