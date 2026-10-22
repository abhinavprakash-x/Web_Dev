# React Notes

React is a **JavaScript library for building user interfaces**. It lets you describe what the UI should look like for a given state, and React updates the page when that state changes.

The important shift from vanilla JavaScript is:

```text
Vanilla JS: select DOM elements → manually update the DOM
React:     describe UI from state → React updates the DOM when needed
```

React is commonly used for web applications with **React DOM**. Other renderers, such as React Native, use React concepts to target different platforms.

---

# 1. JSX

**JSX (JavaScript XML)** is a syntax extension that lets you write HTML-like markup inside JavaScript.

Without JSX:

```jsx
const element = React.createElement(
    "h1",
    { id: "title" },
    "Hello World"
);
```

With JSX:

```jsx
const element = <h1 id="title">Hello World</h1>;
```

JSX is transformed by a build tool/compiler into JavaScript that React can use. The exact output depends on the JSX transform; it is not always literally a call to `React.createElement()`.

A typical modern React project uses a tool such as **Vite** to transform JSX. Babel can also transform JSX. Babel Standalone can be used for small browser demos, but it is not the usual setup for a production application.

## Multiple elements

A component must return one JSX expression. If you want to return multiple sibling elements, wrap them in a parent element or a Fragment.

```jsx
function App() {
    return (
        <div>
            <h1>Hello</h1>
            <h2>World</h2>
        </div>
    );
}
```

A **Fragment** groups elements without adding another DOM element:

```jsx
function App() {
    return (
        <>
            <h1>Hello</h1>
            <h2>World</h2>
        </>
    );
}
```

Good practice: use parentheses around multiline JSX. They are not strictly required in every case, but they make the return value easier to read.

## JavaScript expressions in JSX

Use `{}` to insert a JavaScript expression into JSX:

```jsx
const name = "Abhinav";
const age = 21;

const element = <h1>Hello {name}, age {age}</h1>;
```

You can use expressions such as arithmetic, function calls, ternary expressions, and array methods.

```jsx
const topics = ["HTML", "CSS", "JavaScript", "React"];

const element = (
    <ul>
        {topics.map(topic => (
            <li key={topic}>{topic}</li>
        ))}
    </ul>
);
```

A plain JavaScript object cannot normally be rendered directly as a child. Render one of its properties or convert it into suitable text/JSX instead.

## JSX differences from HTML

- Use `className` instead of `class`.
- Use `htmlFor` instead of `for` on labels.
- Most JSX attributes use camelCase, such as `onClick` and `tabIndex`.
- Inline styles are supplied as a JavaScript object, and CSS property names are camelCase.

```jsx
<h1 className="title">Hello</h1>

<label htmlFor="username">Username</label>

<h1 style={{ color: "white", backgroundColor: "black" }}>
    Hello
</h1>
```

---

# 2. React Elements and Rendering

A **React element** is an object that describes what React should render. It is not itself a real DOM node.

To render a React application into an HTML page, create a root and render a component into the root DOM element.

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

The HTML document must contain the target element:

```html
<div id="root"></div>
```

`root.render(<App />)` asks React to render the `App` component. Prefer this over calling `App()` directly. React needs to manage component rendering and the associated Hooks correctly.

## React's basic update model

A useful simplified picture is:

```text
JSX
 ↓
React elements / React render tree
 ↓
Reconciliation: compare the new description with the previous one
 ↓
Commit necessary changes to the DOM
 ↓
Browser paints the result
```

React tries to apply the necessary DOM changes rather than replacing the entire page on every render. This does **not** mean React is automatically faster than every carefully written vanilla-JavaScript implementation; its main benefit is a declarative, consistent way to describe and update complex UIs.

---

# 3. Components

A **component** is a reusable piece of UI. A function component is a JavaScript function whose name starts with a capital letter and which returns JSX (or another valid React render result).

```jsx
function App() {
    return <h1>Hello World</h1>;
}

export default App;
```

Use a component with JSX:

```jsx
root.render(<App />);
```

Do not normally call it as `App()` yourself.

Components can be composed together:

```jsx
function Header() {
    return <h1>My Website</h1>;
}

function App() {
    return (
        <main>
            <Header />
            <p>Welcome!</p>
        </main>
    );
}
```

Keep components focused and give them clear responsibilities. As an application grows, move reusable components into separate files.

---

# 4. Props

**Props** are inputs passed from a parent component to a child component. They let the same component display different data.

```jsx
function Greeting(props) {
    return <h1>Hello {props.name}, age {props.age}</h1>;
}

function App() {
    return <Greeting name="Abhinav" age={21} />;
}
```

You can destructure props in the function parameter:

```jsx
function Greeting({ name, age }) {
    return <h1>Hello {name}, age {age}</h1>;
}
```

String attributes can be written without braces, while JavaScript values use braces:

```jsx
<Greeting name="Abhinav" age={21} />
```

Props are **read-only** from the receiving component's perspective. If a component needs to change information over time, that information may belong in state or in a parent component's state.

---

# 5. Rendering Lists and `key`

Use JavaScript array methods such as `map()` to render a list:

```jsx
function TopicList() {
    const topics = ["HTML", "CSS", "JavaScript", "React"];

    return (
        <ul>
            {topics.map(topic => (
                <li key={topic}>{topic}</li>
            ))}
        </ul>
    );
}
```

A `key` helps React identify each item among its siblings when a list is inserted into, deleted from, or reordered.

For data objects, use a stable identifier from the data:

```jsx
users.map(user => (
    <p key={user.id}>{user.name}</p>
))
```

Rules of thumb:

- Keys should be unique among siblings.
- Keys should remain stable between renders.
- Do not generate keys using `Math.random()` during rendering.
- Avoid array indexes as keys when items can be inserted, deleted, filtered, or reordered. An index may be acceptable for a truly static list that never changes order.
- `key` is a special React attribute and is not passed to the component as a normal prop. Pass an ID separately if the component needs it.

Without stable keys, React may associate component state or user input with the wrong list item after list changes. Keys are about **element identity**, not simply avoiding extra text updates.

---

# 6. `useState`

A normal local variable does not persist as component state across renders, and changing it does not ask React to render again.

This will not work as intended:

```jsx
function Counter() {
    let count = 0;

    function increment() {
        count++;
    }

    return (
        <>
            <p>Counter: {count}</p>
            <button onClick={increment}>Increment</button>
        </>
    );
}
```

Clicking the button changes the local variable, but React is not notified to update the screen. Manually editing the DOM would bypass React's normal rendering model and quickly become difficult to maintain.

Use the **`useState` Hook** to store information that affects the UI.

```jsx
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <>
            <p>Counter: {count}</p>
            <button onClick={increment}>Increment</button>
        </>
    );
}
```

`useState(0)` gives the initial state value and a setter function:

```jsx
const [count, setCount] = useState(0);
```

- `count` is the current state value for this render.
- `setCount` requests an update to that state.
- Updating state schedules a render; React calls the component again to calculate the updated UI.

## Updating from the previous state

When the next state depends on the previous state, prefer the functional updater form:

```jsx
setCount(previousCount => previousCount + 1);
```

This is particularly important when you queue multiple updates based on the prior value:

```jsx
setCount(count => count + 1);
setCount(count => count + 1);
setCount(count => count + 1);
```

These updates increment the previous state three times.

## State is not a mutable local variable

Calling a setter does not immediately change the `count` variable in the currently executing function. It schedules a future render with the new state.

## Updating arrays and objects in state

Treat state arrays and objects as immutable: create a new array/object rather than mutating the existing one.

Avoid:

```jsx
items.push(newItem);
setItems(items);
```

Prefer:

```jsx
setItems(previousItems => [...previousItems, newItem]);
```

Removing an item:

```jsx
setItems(previousItems => previousItems.filter(item => item.id !== idToRemove));
```

Updating an object:

```jsx
setUser(previousUser => ({
    ...previousUser,
    name: "Abhinav"
}));
```

React compares state values using identity-related rules (including `Object.is`). Mutating an existing array/object and passing the same reference back may prevent the update from being detected as expected and also makes rendering harder to reason about.

## Rules of Hooks

- Call Hooks such as `useState` at the top level of a React function component or a custom Hook.
- Do not call Hooks inside loops, conditions, or nested ordinary functions.
- Call Hooks in the same order on every render.

---

# 7. `useEffect`

`useEffect` is used to **synchronize a component with an external system** after React has committed a render. Examples include:

- Fetching or subscribing to external data
- Timers and intervals
- Event listeners
- Connecting to an external service
- Interacting with a browser API when that interaction is a side effect

It is not necessary for every operation. If something can be calculated directly from props or state while rendering, you often do not need an Effect for it.

Basic syntax:

```jsx
import { useEffect } from "react";

useEffect(() => {
    // Set up or synchronize with an external system.

    return () => {
        // Optional cleanup.
    };
}, [dependencies]);
```

## Dependency array

```jsx
useEffect(() => {
    // Runs after the initial commit and when `count` changes.
}, [count]);
```

- **No dependency array:** the Effect runs after every commit.
- **Empty array `[]`:** the Effect has no reactive dependencies. It runs after the initial commit and is cleaned up when the component unmounts. In development with Strict Mode, React may run an extra setup-and-cleanup cycle.
- **`[count]`:** the Effect runs after the initial commit and after a commit where `count` changes.

Include every reactive value used by the Effect in its dependency list. Do not add or remove dependencies arbitrarily to force a particular schedule.

The function passed to `useEffect` is sometimes called the **Effect setup function**. It is not guaranteed to run only once for the lifetime of a page.

---

# 8. Fetching Data with `useEffect`

Calling a fetch function directly in the component body is a mistake if it causes a state update:

```jsx
function Users() {
    const [users, setUsers] = useState([]);

    async function getUsers() {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data);
    }

    getUsers(); // Not here: this runs during every render.

    return <div>{users.length}</div>;
}
```

A state update triggers a render; rendering calls the component body again; the fetch starts again. This can produce a request loop.

Place this kind of synchronization in an Effect instead:

```jsx
import { useEffect, useState } from "react";

export default function GitHubUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("https://api.github.com/users");

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        }

        getUsers();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <h1>GitHub Users</h1>
            <div>
                {users.map(user => (
                    <img
                        key={user.id}
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        width={100}
                        height={100}
                    />
                ))}
            </div>
        </>
    );
}
```

Notes:

- `fetch()` rejects for some network failures, but not merely because the server returned HTTP `404` or `500`; check `response.ok`.
- `response.json()` returns a Promise.
- Use a stable `key` for each rendered item.
- A production application may also need loading state, cancellation/cleanup, retry behavior, and a data-fetching library. The example above focuses on the basic pattern.
- Development Strict Mode may run an extra Effect setup/cleanup cycle. Do not interpret this as normal production behavior or suppress it blindly; make Effects safe to start and clean up.

## Re-fetching when a value changes

If a value used by the request changes, include it in the dependency array.

```jsx
function GitHubUsers() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(30);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(
                `https://api.github.com/users?per_page=${count}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        }

        getUsers().catch(console.error);
    }, [count]);

    return (
        <>
            <label>
                Number of users:
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={event => setCount(Number(event.target.value))}
                />
            </label>

            {users.map(user => (
                <p key={user.id}>{user.login}</p>
            ))}
        </>
    );
}
```

Here, changing `count` updates state. React renders again, then the Effect runs because its `count` dependency changed.

`onChange` is the React event prop for reacting to changes in an input. For a controlled input, the displayed value comes from state and the handler updates that state.

---

# 9. Cleanup Functions and Timers

Effects can return a cleanup function. React calls it before re-running the Effect with changed dependencies and when the component is removed. This is important for clearing timers, removing listeners, or closing subscriptions.

A clock with a properly managed interval:

```jsx
import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(() => new Date().toLocaleTimeString());
    const [running, setRunning] = useState(true);

    useEffect(() => {
        if (!running) {
            return;
        }

        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [running]);

    return (
        <>
            <button onClick={() => setRunning(value => !value)}>
                {running ? "Stop" : "Start"}
            </button>
            <h1>Time: {time}</h1>
        </>
    );
}
```

Why is cleanup needed?

Without clearing the previous interval, every re-render or repeated setup could leave extra intervals running. Cleanup ensures the interval created by this Effect is stopped when it is no longer needed.

Remember the sequence when a dependency changes:

```text
Old cleanup (if present)
        ↓
New Effect setup
```

In development, Strict Mode performs an extra setup → cleanup → setup cycle to help expose missing cleanup logic.

---

# 10. Rendering, Reflow, and Repaint

The browser's rendering pipeline can be simplified as:

```text
HTML → DOM
CSS  → CSSOM
        ↓
Style calculation / render information
        ↓
Layout (often called reflow)
        ↓
Paint (often called repaint)
        ↓
Compositing / display
```

- **DOM:** the browser's object representation of the HTML document.
- **CSSOM:** the browser's representation of CSS rules.
- **Layout / reflow:** determines element geometry, such as sizes and positions.
- **Paint / repaint:** draws visual details such as text, colors, and borders.

This is a simplified model; browsers can optimize or combine work depending on what changed. Layout and paint can be expensive, so avoid unnecessary layout thrashing and large repeated DOM updates.

React does not replace the browser's DOM or rendering pipeline. It provides a declarative way to describe UI and calculates which DOM updates are needed.

---

# 11. Virtual DOM and Reconciliation

The phrase **Virtual DOM** is commonly used for React's in-memory representation of the UI. It is helpful as a mental model, but it is not an exact lightweight clone of every property in the browser's real DOM.

When props or state change, React can:

1. Call components to produce a new description of the UI.
2. Compare the new result with the previous result.
3. Determine which updates are needed.
4. Commit those changes to the real DOM.

This comparison and update process is commonly described as **reconciliation**. Comparing elements is often called **diffing**.

Not every render leads to a DOM change. React can call a component and then determine that no DOM update is necessary.

## Static and dynamic content

For example:

```jsx
<h1>Counter: {count}</h1>
```

When `count` changes, React can update the text to show the new value. You can think of `"Counter: "` as the stable part and the number as the changing part, but React's reconciliation is more general than literally splitting JSX into static and dynamic chunks.

## Lists and identity

Keys help React match items in a list across renders. Consider inserting an item at the start of a list:

```text
Before: Apple, Orange, Banana
After:  Mango, Apple, Orange, Banana
```

Stable keys tell React which item is Mango, which is Apple, and so on. Without suitable keys—or with changing/index keys in a mutable list—React may reuse the wrong component instance, causing incorrect local state or other surprising behavior.

Do not think of keys as being attached directly to state. React uses a component's position in the tree, its type, and its key (when provided) to determine whether to preserve or reset its state.

## State and reference identity

When state contains an array or object, create a new reference when updating it:

```jsx
setItems(previousItems => [...previousItems, newItem]);
```

Do not mutate the existing array and pass the same reference back:

```jsx
items.push(newItem);
setItems(items);
```

This is not just a React performance trick. Immutable updates make changes easier to detect, debug, and reason about.

---

# 12. React Fiber

**Fiber** is the internal architecture React uses to represent and manage units of rendering work. You do not need to implement Fiber to use React, but it helps explain some of React's scheduling behavior.

A simplified way to think about it:

- React represents work associated with components using Fiber nodes.
- The nodes link related work, including child and sibling relationships.
- This structure allows React to organize, schedule, and prioritize rendering work.
- In supported situations, React can pause or yield during rendering work and continue later, rather than treating all rendering work as one uninterrupted recursive call.
- React commits the finished set of changes to the DOM in a commit phase.

Fiber is **not** a separate JavaScript thread. JavaScript still executes on the relevant thread, and not every render is interruptible in every phase. The useful takeaway is that Fiber gives React a structure for scheduling and managing rendering work.

Conceptually, a tree-like structure may use links such as:

```text
Parent
  ├── Child
  └── Sibling of Child
```

The actual Fiber structure contains additional fields and behavior; this diagram is only a beginner-level illustration.

---

# 13. Quick Reference

## React component

```jsx
function Welcome() {
    return <h1>Hello</h1>;
}
```

## Props

```jsx
function Welcome({ name }) {
    return <h1>Hello {name}</h1>;
}

<Welcome name="Abhinav" />
```

## State

```jsx
const [count, setCount] = useState(0);
setCount(count => count + 1);
```

## Conditional rendering

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

## Lists

```jsx
{items.map(item => (
    <li key={item.id}>{item.name}</li>
))}
```

## Effect

```jsx
useEffect(() => {
    // Synchronize with an external system.

    return () => {
        // Clean up the setup when needed.
    };
}, [dependency]);
```

## Immutable array update

```jsx
setItems(previousItems => [...previousItems, newItem]);
```

---

# Key Takeaways

1. React is a JavaScript library for building user interfaces.
2. JSX is HTML-like syntax transformed into JavaScript by a build tool/compiler.
3. Components are reusable UI units; use JSX such as `<App />` rather than calling component functions manually.
4. Props pass read-only inputs from a parent component to a child.
5. `useState` stores values that affect rendering; its setter schedules an update.
6. Treat objects and arrays in state as immutable and create new values when updating them.
7. Use stable keys when rendering lists.
8. `useEffect` synchronizes React with external systems and may require cleanup.
9. React rendering and DOM committing are distinct stages; a render does not always cause DOM mutations.
10. The Virtual DOM is a useful model for React's UI representation, not a literal clone of the browser DOM.
11. Fiber is React's internal architecture for organizing and scheduling rendering work.
12. In development, Strict Mode may intentionally re-run component rendering and Effect setup/cleanup to reveal bugs.

---

# Official References

- [Quick Start](https://react.dev/learn)
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Your First Component](https://react.dev/learn/your-first-component)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [Strict Mode](https://react.dev/reference/react/StrictMode)
