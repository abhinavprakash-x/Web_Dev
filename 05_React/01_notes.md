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