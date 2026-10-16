# React
It is a JS Library.

- React creates objects that represent DOM nodes. These objects are called React elements. Virtual DOM is a lightweight copy of the real DOM. React uses virtual DOM to update the real DOM efficiently.
- ReactDOM renders React elements into the DOM and updates them when data changes.

React is used with
- web (react-dom rendering engine)
- react native
- react pdf


## JSX JavaScript XML
HTML Like Syntax in JS
Without JSX:

```javascript
const e = React.createElement('h1', {id:'title'}, "Hello World");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e);
```

With JSX:
```jsx
const e = <h1 id='title'>Hello World</h1>;
```

**Babel: Converts With JSX Code to Without JSX Code**
**Note: Use `<script type='text/babel' href='...'>` to Use Babel compiler**

```
JSX Code -> React.createElement(...) -> React Element (JS Object) -> ReactDOM (Render HTML Element)
```

Good Practices:
1. Wrap Up multi line JSX Code in brackets.
2. One root element (wrap everything in a div).

```jsx
const e = (<div>
        <h1>hello</h1>
        <h2>world</h2>
    </div>
);
```

## React Component
A function (first letter Capital to differentiate between HTML tag and Custom tag)

```jsx
function App() {
    return (<h1>Hello World</h1>);
}
root.render(App());
root.render(<App/>)

function App2(name) {
    return (<h2>Hello {name}</h2>);
}
root.render(App("Abhinav"));
```
You can write any JS Expression in JSX using `{}` except Object

```jsx
const arr = ['HTML','CSS','JS','React'];
const e = (<ul>
        {arr.map(a=><li>{a}</li>)}
    </ul>
)
```

## Props
```jsx
function App(props) {
    return (<h1>Hello World {props.name} {props.age}</h1>)
}

const e = <App name="Abhinav" age={21}> </App>
root.render(e);

const e2 = <h1 id='title' style={{color:"white", backgroundColor:"black"}}>Hii</h1>
```

Note: `class` is a reserved keyword in JS, so use `className` instead of `class` in JSX.
Note: `for` is a reserved keyword in JS, so use `htmlFor` instead of `for` in JSX.
Note: <></> is a React Fragment, it is used to wrap multiple elements without adding an extra node to the DOM.

## useState Hook in React

```js
function App() {
    let count = 0;

    function incr() {
        count++;
    }

    return {
        <>
            <p>Counter: {count}</p>
            <button onClick={incr}>Increment</button>
        </>
    }
}

const e = <App />
ReactDOM.createRoot(document.getElementById('root')).render(e);
```
But doing these only increments the variable count but it doesn't update on the screen.
You'll have to manually update on the UI in thr `incr()` using dom manipulation and it's a
hassle if the variable is being used multiple times.

```js
function incr() {
    count++;
    let pa = document.querySelector('p');
    pa.textContent = Counter: {count};
}
```

But React makes this easier using inbuilt powerful functions called Hooks.

```js
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
```

It basically rerenders the function in this case `App()` with updated value.

## useEffect Hook in React
```js
export default function App() {
    const [users, setUsers] = useState([]);

    async function git_profile() {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data);
    }

    git_profile();

    return (
        <>
            <h1>Github Users</h1>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap"}}>
                {
                    users.map(user=>(
                        <img src={user.avatar_url} height={"100px"} width={"100px"}/>
                    ));
                }
            </div>
        </>
    );
}
```
But this will keep calling the API again and again. Since everytime the useState hook updates it will
call the App() function and that means it will call the git_profile() function too, so the users will
be updated again, and this forms an infinite loop.

To fix this issue useEffect hook is used instead.
```js
export default function App() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function git_profile() {
            const response = await fetch("https://api.github.com/users");
            const data = await response.json();
            setUsers(data);
        }
        git_profile();
    }, []); // [] = dependency array

    return (
        <>
            <h1>Github Users</h1>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap"}}>
                {
                    users.map(user=>(
                        <img src={user.avatar_url} height={"100px"} width={"100px"} key={user.login}/>
                    ))
                }
            </div>
        </>
    );
}
```
The callback function inside useEffect is executed last and it is also known as the Side-Effect Hook.
If we provide the dependency array to be empty `[]` then it will only run once on rendering
and avoid the infinite loop on every re-render. If we don't add the empty array then it will
call everytime App() re-renders.

If you pass a variable to the dependency array then the useEffect hook will be called everytime
the value of that variable changes.
eg.
```js
export default function App() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(30);

    useEffect(()=>{
        async function git_profile() {
            const response = await fetch(`https://api.github.com/users?per_page=${count}`);
            const data = await response.json();
            setUsers(data);
        }
        git_profile();
    }, [count]); // [count] = dependency array

    return (
        <>
            <h1>Github Users</h1>
            <input type="number" value={count} onChange={(e)=>setCount(e.target.value)}></input>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap"}}>
                {
                    users.map(user=>(
                        <img src={user.avatar_url} height={"100px"} width={"100px"} key={user.login}/>
                    ))
                }
            </div>
        </>
    );
}
```
`onChange` Event => whenever the value changes.

onEffect hook is generally used for API calls, DOM Manipulation, and Subscriptions.
onEffect hook is called after the render is committed to the screen. It is also called after every re-render.
onEffect hook is also used with web API's like `setTimeout`, `setInterval`, and `requestAnimationFrame` to perform side effects.

```js
export default function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    setInterval(()=>{
        setTime(new Date().toLocaleTimeString());
    }, 1000);

    return (
        <>
            <h1>Counter: {count}</h1>
        </>
    );
}
```
But this will create a new interval on every re-render and it will keep creating new intervals and the old intervals will keep running in the background. So to avoid this we can use the useEffect hook to create the interval only once on the initial render.

```js
export default function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <>
            <h1>Time: {time}</h1>
        </>
    );
}
```
This can furthher be improved by clearing the interval when the component is unmounted. This can be done by returning a cleanup function from the useEffect hook.

```js
export default function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [show, setShow] = useState(true);

    useEffect(()=>{
        if(!show) return;

        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, [show]);

    return (
        <>
            <button onClick={()=>setShow(!show)}>{show ? "Stop" : "Start"}</button>
            {
                show && <h1>Time: {time}</h1>
            }
        </>
    );
}
```
This works because the cleanup function is called before the next effect is executed. So when the `show` state changes to false, the cleanup function is called and the interval is cleared.