# React: The Remaining Practical Concepts

These notes continue from the previous React sections. They assume you already understand JSX, components, props, `useState`, `useEffect`, `useContext`, `useRef`, memoization, forms, and basic rendering/reconciliation.

The goal is **not** to memorize every React API. It is to understand the concepts that help you design, organize, navigate, test, and improve a real React application.

## What is worth learning first?

| Priority | Topic | Why it matters |
|---|---|---|
| High | State design and `useReducer` | Keeps complicated state updates understandable |
| High | Custom Hooks | Reuses stateful logic between components |
| High | Correct use of `useEffect` | Prevents loops, stale data, and resource leaks |
| High | React Router | Adds pages, URLs, and navigation |
| High | Component composition | Keeps components reusable and maintainable |
| Medium | Error boundaries and `Suspense` | Improves failure and loading experiences |
| Medium | TypeScript with React | Helps catch mistakes and document component contracts |
| Medium | Component testing | Gives confidence that the UI behaves correctly |
| Later | Transitions and optimistic UI | Helps with more involved interactions |

---

# 1. Rules of Hooks

Hooks are functions such as `useState`, `useEffect`, `useContext`, and custom Hooks.

Follow these rules:

1. Call Hooks at the top level of a function component or another custom Hook.
2. Do not call Hooks inside conditions, loops, nested functions, or event handlers.
3. Do not call Hooks from ordinary JavaScript functions or class components.
4. A custom Hook's name must begin with `use` (for example, `useOnlineStatus`).

Correct:

```jsx
function Counter({ enabled }) {
  const [count, setCount] = useState(0);

  if (!enabled) {
    return <p>Counter disabled</p>;
  }

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

Incorrect:

```jsx
function Counter({ enabled }) {
  if (enabled) {
    // Don't call a Hook conditionally.
    const [count, setCount] = useState(0);
  }

  return null;
}
```

React relies on Hooks being called in the same order on every render. The `eslint-plugin-react-hooks` package can detect many violations.

---

# 2. Component Composition and `children`

A component does not have to know the exact content it displays. It can receive content through the special `children` prop.

```jsx
function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <Card title="Profile">
      <p>Name: Abhinav</p>
      <button>View profile</button>
    </Card>
  );
}
```

Everything placed between the opening and closing `<Card>` tags is passed to `Card` as `children`.

This is called **composition**: build larger interfaces by combining smaller components.

Common examples:

- `Card` accepts content.
- `Modal` accepts the dialog content.
- `Layout` accepts a page as its children.
- `Button` may accept an icon and label as children.

Prefer composition over building one giant component with dozens of boolean props such as `showHeader`, `showFooter`, `isModal`, and `isCompact`.

---

# 3. Designing State Properly

Knowing `useState` is not enough. You must decide **what should be state, where it should live, and how it should be shaped**.

## 3.1 Keep one source of truth

If multiple components need the same information, avoid maintaining separate copies of it. Keep one authoritative state value and pass it to the components that need it.

For example, store the selected product ID rather than both the ID and a copied product object:

```jsx
const [selectedId, setSelectedId] = useState(1);

const selectedProduct = products.find(product => product.id === selectedId);
```

`selectedProduct` can be calculated during rendering. It does not need its own state variable.

## 3.2 Avoid redundant state

Avoid storing values that can be calculated from existing props or state.

Less ideal:

```jsx
const [price, setPrice] = useState(100);
const [quantity, setQuantity] = useState(2);
const [total, setTotal] = useState(200);
```

Now every update must remember to update `total` too. It can become inconsistent.

Usually better:

```jsx
const [price, setPrice] = useState(100);
const [quantity, setQuantity] = useState(2);

const total = price * quantity;
```

Calculate derived values during render. Use `useMemo` only if the calculation is measurably expensive or stable identity is needed for a specific reason.

## 3.3 Avoid contradictory state

Instead of several booleans:

```jsx
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [hasError, setHasError] = useState(false);
```

consider a single status:

```jsx
const [status, setStatus] = useState("idle");
// "idle" | "loading" | "success" | "error"
```

This avoids impossible combinations such as `isLoading === true` and `isSuccess === true`.

## 3.4 State is tied to a component's position and identity

React associates state with a component's position in the rendered UI tree. A component that remains at the same position with the same type normally preserves its state between renders.

A different `key` can deliberately reset a component's state:

```jsx
function App({ selectedUser }) {
  return <ProfileEditor key={selectedUser.id} user={selectedUser} />;
}
```

When `selectedUser.id` changes, React treats the editor as a different component identity and creates fresh state for it.

**Use keys for identity, not as a generic refresh button.** Keys in lists should be stable IDs from the data where possible.

---

# 4. `useReducer`

`useReducer` is an alternative to `useState` for managing state.

It is particularly useful when:

- State has several related fields.
- Many event handlers update the same state.
- The update rules are becoming complicated.
- You want to describe updates as named actions.

Syntax:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: current state.
- `dispatch(action)`: asks the reducer to calculate the next state.
- `reducer`: a pure function that receives the previous state and an action, then returns the next state.
- `initialState`: initial value.

## Example: task list

```jsx
import { useReducer, useState } from "react";

const initialTasks = [
  { id: 1, text: "Learn useReducer", done: false },
  { id: 2, text: "Build a React project", done: false }
];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [
        ...tasks,
        { id: action.id, text: action.text, done: false }
      ];

    case "toggled":
      return tasks.map(task =>
        task.id === action.id
          ? { ...task, done: !task.done }
          : task
      );

    case "deleted":
      return tasks.filter(task => task.id !== action.id);

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [text, setText] = useState("");

  function handleAdd(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: "added",
      id: crypto.randomUUID(),
      text: trimmed
    });
    setText("");
  }

  return (
    <main>
      <form onSubmit={handleAdd}>
        <input value={text} onChange={event => setText(event.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: "toggled", id: task.id })}
              />
              {task.text}
            </label>
            <button onClick={() => dispatch({ type: "deleted", id: task.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Notice that the event handlers do not directly modify `tasks`. They dispatch descriptions of what happened. The reducer contains the rules for producing the next state.

## `useState` vs `useReducer`

| `useState` | `useReducer` |
|---|---|
| Good for simple, independent values | Good for related or more complex state |
| Update with a setter | Update by dispatching an action |
| Logic often sits in event handlers | Update logic is centralized in the reducer |

Do not replace every `useState` with `useReducer`. Use the simpler tool until the state logic becomes difficult to manage.

### Reducers must be pure

A reducer should:

- Return the next state.
- Not mutate the previous state.
- Not perform network requests, timers, or other side effects.
- Produce the same output for the same inputs.

Generate IDs, read the current time, or perform API requests in an event handler or an appropriate Action—not inside the reducer.

---

# 5. Combining Context with `useReducer`

Your earlier notes covered Context and showed how a shared counter can be read and updated by components far apart in the component tree.

When shared state becomes more complicated, Context can distribute the state and dispatch function, while `useReducer` handles the update logic.

```jsx
import { createContext, useContext, useReducer } from "react";

const TasksStateContext = createContext(null);
const TasksDispatchContext = createContext(null);

const initialTasks = [];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [
        ...tasks,
        { id: action.id, text: action.text, done: false }
      ];
    case "toggled":
      return tasks.map(task =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksStateContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksStateContext);
  if (context === null) {
    throw new Error("useTasks must be used inside TasksProvider");
  }
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error("useTasksDispatch must be used inside TasksProvider");
  }
  return context;
}
```

Use the provider around the part of the application that needs this state:

```jsx
import { TasksProvider } from "./TasksContext";
import TaskList from "./TaskList";

export default function App() {
  return (
    <TasksProvider>
      <TaskList />
    </TasksProvider>
  );
}
```

A descendant can access the state and dispatch actions:

```jsx
import { useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList() {
  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => dispatch({ type: "toggled", id: task.id })}>
            Toggle
          </button>
        </li>
      ))}
    </ul>
  );
}
```

This demonstrates the pattern; a real application would usually keep the reducer, provider, and custom Hooks in separate files.

**Important:** Context is not automatically a performance optimization. Components that read a Context value re-render when that value changes. Splitting state and dispatch Contexts can avoid notifying dispatch-only consumers when only the state value changes, but choose this based on actual needs.

---

# 6. Custom Hooks

A **custom Hook** is a JavaScript function that uses React Hooks and packages reusable stateful logic.

Rules:

- Its name starts with `use` followed by a capital letter.
- It may call built-in Hooks and other custom Hooks.
- It must obey the Rules of Hooks.
- It shares logic, not one shared state instance: each component calling a custom Hook gets its own Hook state unless the Hook uses a shared external store or Context.

## Example: `useOnlineStatus`

```jsx
import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

Use the Hook in any component that needs the information:

```jsx
import { useOnlineStatus } from "./useOnlineStatus";

export default function NetworkStatus() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? "Online" : "Offline"}</p>;
}
```

Custom Hooks are useful for extracting repeated behavior such as subscriptions, timers, browser API interactions, or other stateful logic. Do not create a custom Hook for every tiny expression; extract one when it makes the code clearer or avoids meaningful duplication.

---

# 7. Understanding `useEffect` More Deeply

Your earlier notes cover the basic dependency array and cleanup function. The important mental model is:

> An Effect synchronizes a component with something outside React.

Examples of external systems:

- A timer.
- A browser event listener.
- A WebSocket connection.
- A third-party widget.
- A network subscription.

## 7.1 Effect setup and cleanup

```jsx
useEffect(() => {
  // Setup: connect or subscribe.

  return () => {
    // Cleanup: disconnect or unsubscribe.
  };
}, [dependency]);
```

When dependencies change, React runs the previous cleanup first, then runs the Effect again with the new values. When the component is removed, React runs the final cleanup.

The dependency array must include every reactive value used by the Effect. React compares dependencies with `Object.is`.

| Dependency argument | Behavior |
|---|---|
| No second argument | Effect runs after every commit |
| `[]` | Effect runs after mount; cleanup runs on unmount (plus an extra development check in Strict Mode) |
| `[value]` | Effect re-runs when `value` changes |

## 7.2 Strict Mode and the extra development check

When Strict Mode is enabled, React performs an extra setup → cleanup → setup cycle for Effects in development to help reveal missing cleanup logic.

This is not a production double-fetch feature. Do not remove Strict Mode just to hide a bug. Make the Effect safe to start and stop correctly.

## 7.3 Do not use Effects for every calculation

Avoid this pattern when `fullName` is simply calculated from existing state:

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Prefer:

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const fullName = `${firstName} ${lastName}`;
```

The second version has fewer state variables and avoids an unnecessary extra render.

## 7.4 Avoid stale or outdated network responses

When a search term changes quickly, an earlier request can finish after a later request. Use `AbortController` to cancel the outdated request during cleanup.

```jsx
import { useEffect, useState } from "react";

export default function UserSearch({ username }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username.trim()) {
      setUser(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadUser() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUser();
    return () => controller.abort();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!user) return <p>Enter a username.</p>;

  return <h2>{user.login}</h2>;
}
```

This illustrates cancellation and cleanup. For a larger application with caching, request deduplication, retries, and background refetching, consider a data-fetching library such as TanStack Query or a router's data APIs instead of building all of that yourself.

---

# 8. React Router

React itself does not provide a full client-side routing system. **React Router** is a popular library for matching URLs to components and navigating between pages without a full document reload.

Install it in a Vite React project:

```bash
npm install react-router
```

The examples below use the current Declarative Mode API. Older tutorials may use a different package import such as `react-router-dom`; follow the documentation for the version installed in your project.

## 8.1 Set up `BrowserRouter`

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

`BrowserRouter` uses the browser's History API to keep the UI in sync with the URL.

## 8.2 Define routes

```jsx
// App.jsx
import { Routes, Route, Link } from "react-router";

function Home() {
  return <h1>Home page</h1>;
}

function About() {
  return <h1>About page</h1>;
}

function NotFound() {
  return <h1>404 - Page not found</h1>;
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
```

Important components:

- `BrowserRouter`: provides routing context.
- `Routes`: chooses the best matching route.
- `Route`: maps a URL pattern to an element.
- `Link`: navigates without a full page reload.
- `NavLink`: like `Link`, but also exposes whether the link is active.

Use normal `<a>` elements for external websites. Use router links for internal application navigation.

## 8.3 URL parameters with `useParams`

A route can contain a dynamic segment:

```jsx
<Route path="/users/:userId" element={<UserDetails />} />
```

Read it inside the page component:

```jsx
import { useParams } from "react-router";

function UserDetails() {
  const { userId } = useParams();
  return <h1>User ID: {userId}</h1>;
}
```

Visiting `/users/42` gives `userId === "42"`. Route parameters are strings, so convert them when you need a number.

## 8.4 Programmatic navigation with `useNavigate`

```jsx
import { useNavigate } from "react-router";

function LoginButton() {
  const navigate = useNavigate();

  function handleLogin() {
    // Perform login first, then navigate after success.
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Log in</button>;
}
```

Use `<Link>` for ordinary navigation links. Use `useNavigate()` when navigation is a consequence of an event or completed operation.

## 8.5 Nested routes and `Outlet`

Nested routes allow pages to share a common layout.

```jsx
import { Routes, Route, Outlet, Link } from "react-router";

function DashboardLayout() {
  return (
    <>
      <nav>
        <Link to="overview">Overview</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </>
  );
}

function Overview() {
  return <h2>Dashboard overview</h2>;
}

function Settings() {
  return <h2>Dashboard settings</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
```

`<Outlet />` is where the matching child route is rendered. The `index` route is the default child at `/dashboard`.

## 8.6 Query parameters

Query parameters are useful for search, filters, sorting, and pagination:

```text
/products?category=books&page=2
```

```jsx
import { useSearchParams } from "react-router";

function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  function goToNextPage() {
    setSearchParams({ page: String(Number(page) + 1) });
  }

  return <button onClick={goToNextPage}>Next page</button>;
}
```

Learn these basics before exploring React Router's Data Mode or Framework Mode.

---

# 9. Code Splitting: `lazy()` and `Suspense`

A large application does not always need to load every page's JavaScript at the beginning.

`lazy()` lets React load a component's code only when it is first rendered. `Suspense` displays fallback UI while the component is loading.

```jsx
import { lazy, Suspense } from "react";

const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading settings...</p>}>
      <SettingsPage />
    </Suspense>
  );
}
```

Important:

- Define the `lazy()` component outside your component function.
- The imported module should default-export the component in this example.
- Put a `Suspense` boundary above the lazy component.
- A `Suspense` fallback is not automatically triggered by every `fetch()` call inside `useEffect`. Suspense only responds to supported Suspense-enabled sources, such as `lazy()` component loading or a Suspense-enabled data/framework integration.

For your first projects, understand the idea; you do not need to optimize every page immediately.

---

# 10. Error Boundaries

An **Error Boundary** is a component that catches certain errors thrown while rendering its descendant component tree and displays fallback UI instead of allowing that part of the UI to disappear completely.

React's built-in Error Boundary pattern is implemented with a class component. Function components do not currently have a direct built-in Hook that turns them into Error Boundaries.

```jsx
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("A component crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}
```

Wrap a part of the application:

```jsx
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

Error Boundaries generally catch errors during rendering and lifecycle work in descendant components. They do **not** catch errors from ordinary event handlers, most asynchronous callbacks such as `setTimeout`, server-side rendering, or errors thrown by the boundary itself.

For a real application, a library such as `react-error-boundary` can provide a convenient function-component API around this pattern.

---

# 11. `useTransition` and `useDeferredValue`

These Hooks are performance tools for interfaces where an update is expensive. They are not needed for ordinary buttons, small lists, or every state update.

## 11.1 `useTransition`

`useTransition` marks some state updates as **non-urgent**. React can work on those updates without making more urgent interactions wait unnecessarily.

```jsx
import { useState, useTransition } from "react";

export default function Tabs() {
  const [tab, setTab] = useState("about");
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <button onClick={() => selectTab("about")}>About</button>
      <button onClick={() => selectTab("posts")}>Posts</button>
      {isPending && <p>Updating...</p>}
      <TabContent tab={tab} />
    </>
  );
}
```

The function passed to `startTransition` runs immediately; state updates inside it are marked as transitions. Do not use a Transition to control a text input's value. Input updates should remain urgent.

## 11.2 `useDeferredValue`

`useDeferredValue` lets a part of the UI use a deferred version of a value. This can help when rendering results from an input is expensive.

```jsx
import { useDeferredValue, useMemo, useState } from "react";

export default function Search({ items }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [items, deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <>
      <input value={query} onChange={event => setQuery(event.target.value)} />
      <ul style={{ opacity: isStale ? 0.5 : 1 }}>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </>
  );
}
```

The input remains responsive while the expensive results can lag behind briefly. `useDeferredValue` does not debounce network requests; it defers rendering work. Use a debounce technique when you specifically want to delay making requests.

---

# 12. React 19 Actions: `useActionState` and `useOptimistic` (Optional)

These are useful to know about, but you do not need to master them before building your first React projects.

## 12.1 `useActionState`

`useActionState` manages the result of an Action and exposes whether the Action is pending.

```jsx
import { useActionState } from "react";

async function saveName(previousState, formData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { message: "Name is required." };
  }

  // Replace this with an actual API request.
  await new Promise(resolve => setTimeout(resolve, 500));

  return { message: `Saved name: ${name}` };
}

export default function NameForm() {
  const [state, formAction, isPending] = useActionState(
    saveName,
    { message: "" }
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
      <p>{state.message}</p>
    </form>
  );
}
```

The Action receives the previous state and the form data, and returns the next state. `isPending` indicates that the Action is in progress.

This is related to React's Actions and form APIs. Server Functions and progressive enhancement require a framework/runtime that supports them; the example above only simulates an asynchronous save in the browser.

## 12.2 `useOptimistic`

Optimistic UI means showing the expected result immediately while waiting for the server to confirm it.

Example idea: when someone posts a comment, show it in the list immediately with a small “Sending…” label. If the request fails, the UI returns to the actual confirmed data.

`useOptimistic` creates a temporary optimistic view of some state while an Action is pending. It does not replace the real server state or guarantee that the server operation succeeds.

Learn this when you build an application where immediate feedback during a network operation is useful.

---

# 13. TypeScript with React (Ecosystem Skill)

TypeScript is not a React feature. It is JavaScript with a type system, and it is commonly used with React to describe props, state, events, and API data.

A file containing JSX in TypeScript uses the `.tsx` extension.

## Typing props

```tsx
type UserCardProps = {
  name: string;
  age: number;
  isAdmin?: boolean;
};

function UserCard({ name, age, isAdmin = false }: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <strong>Administrator</strong>}
    </article>
  );
}
```

- `name: string` means `name` must be a string.
- `age: number` means `age` must be a number.
- `isAdmin?: boolean` means it is an optional boolean prop.

## Typing state

```tsx
import { useState } from "react";

type User = {
  id: number;
  name: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  // setUser({ id: 1, name: "Abhinav" });
  // setUser(null);

  return <p>{user ? user.name : "No user selected"}</p>;
}
```

`User | null` is a union type: the value is either a `User` or `null`.

You do not need to switch your first React exercises to TypeScript. Learn basic TypeScript separately, then use it on a later project or introduce it gradually.

---

# 14. Testing React Components

A component can look correct but still behave incorrectly when someone clicks a button, submits a form, or enters invalid data. Tests let you check behavior automatically.

A common setup is:

- **Vitest:** test runner and assertion APIs, integrates with Vite.
- **React Testing Library:** renders components and helps test them as users interact with them.
- **user-event:** simulates realistic user interactions.
- **jest-dom:** adds readable DOM matchers such as `toBeInTheDocument()`.

Install the packages:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

Example Vite configuration:

```js
// vite.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
});
```

Setup file:

```js
// src/setupTests.js
import "@testing-library/jest-dom/vitest";
```

A component to test:

```jsx
// Counter.jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(current => current + 1)}>
        Increment
      </button>
    </>
  );
}
```

A test:

```jsx
// Counter.test.jsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  it("increments when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

Run tests with:

```bash
npx vitest
```

Test behavior from the user's perspective:

- Can the user find the button?
- Does clicking it update the displayed count?
- Does invalid form data show an error?
- Does submitting valid data show the expected result?

Avoid making tests depend too heavily on internal implementation details. A test should usually continue to pass if you refactor the component but preserve its behavior.

---

# 15. A Sensible Project Structure

There is no single correct folder structure. Start simple and organize by feature as the application grows.

Example:

```text
src/
├── main.jsx
├── App.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Button.jsx
│   └── Loading.jsx
├── pages/
│   ├── Home.jsx
│   ├── Expenses.jsx
│   └── NotFound.jsx
├── hooks/
│   └── useOnlineStatus.js
├── context/
│   └── TasksContext.jsx
├── services/
│   └── api.js
└── styles/
    └── main.css
```

As projects become larger, grouping files by feature can be more convenient:

```text
src/
├── app/
├── features/
│   ├── expenses/
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseForm.jsx
│   │   └── expensesApi.js
│   └── users/
├── components/
└── main.jsx
```

Do not create folders just to follow a template. Organize code when it makes files easier to find and responsibilities easier to understand.

---

# 16. What You Can Leave for Later

These are real parts of the React ecosystem, but you do not need to study all of them before making your first two projects.

| Topic | What it is | When to learn it |
|---|---|---|
| Redux Toolkit / Zustand | External state-management tools | When local state + Context become awkward |
| TanStack Query | Server-state fetching, caching, and synchronization | When an app has substantial API data |
| React Server Components | Components that can run as part of a server rendering architecture | When exploring a React framework that supports them |
| Next.js / React Router Framework Mode | Framework-level routing and rendering tools | When you need SSR, server features, or a full framework |
| Advanced animations | Motion and animation libraries | When a project needs polished interactions |
| React Compiler internals | Compiler optimizations for React code | Optional; understand its purpose, not its internals |
| Advanced concurrent features | More detailed scheduling and rendering behavior | When you encounter a real performance problem |

You should know that these tools exist, but do not turn this table into another checklist that must be completed before building anything.

---

# 17. Final React Checklist

Use this as a self-assessment, not a memorization test.

### Core React

- [ ] I can split a UI into components.
- [ ] I understand props, `children`, and component composition.
- [ ] I can manage state and update arrays/objects immutably.
- [ ] I understand why list keys need stable identity.
- [ ] I know when state should be lifted to a common parent.
- [ ] I can explain Context and its limitations.
- [ ] I know the Rules of Hooks.

### Intermediate React

- [ ] I can use `useReducer` for more complex state transitions.
- [ ] I can combine Context and `useReducer` when shared state needs it.
- [ ] I can write a simple custom Hook.
- [ ] I understand Effect dependencies and cleanup.
- [ ] I know when I do not need an Effect.
- [ ] I can build a multi-page app with React Router.
- [ ] I can handle loading, error, and empty states.

### Application skills

- [ ] I can organize a project into components, pages, hooks, and services.
- [ ] I can use a form library and validation schema when useful.
- [ ] I understand the purpose of Error Boundaries and Suspense.
- [ ] I can write a basic component test.
- [ ] I can read TypeScript props and state types.

You do **not** need every box checked to start building. The best way to complete this list is by building applications and learning the missing pieces when they become relevant.

---

# 18. Suggested Next Projects

After reading these notes, stop collecting React topics and build something.

## Project 1: Expense Tracker

Suggested features:

- Add, edit, and delete expenses.
- Categories and dates.
- Total spending and category summaries.
- Filter and sort expenses.
- Form validation.
- Save data in `localStorage` initially.
- Split the app into reusable components.
- Use Context + `useReducer` only if shared state becomes complicated.

Concepts practised: state design, forms, controlled inputs, array methods, component composition, custom Hooks, and persistence.

## Project 2: Country Explorer or GitHub Explorer

Suggested features:

- Search for a country or GitHub user.
- List and detail pages using React Router.
- Loading, error, and empty states.
- URL parameters and query parameters.
- Filters and sorting.
- Responsive layout.
- Component tests for the main interactions.

Concepts practised: routing, API integration, Effects or a data-fetching library, reusable components, testing, and application structure.

---

# 19. Big Picture

```text
React Fundamentals
    ├── JSX and components
    ├── Props and composition
    ├── State and events
    └── Rendering and keys
            ↓
State Design
    ├── Lifting state
    ├── Context
    └── useReducer
            ↓
Reusable Logic
    ├── Custom Hooks
    └── Correct Effects and cleanup
            ↓
Application Features
    ├── Forms and validation
    ├── React Router
    ├── API integration
    ├── Loading and error handling
    └── Error Boundaries / Suspense
            ↓
Application Quality
    ├── TypeScript
    ├── Testing
    └── Project structure
            ↓
Build and improve real applications
```

**The important stopping point:** Once you understand these concepts at a practical level, build your two React projects. You do not need to master every advanced React API before moving on to backend development.

---

# Official References

- [Rules of Hooks](https://react.dev/reference/rules)
- [Managing State](https://react.dev/learn/managing-state)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [useReducer](https://react.dev/reference/react/useReducer)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useEffect](https://react.dev/reference/react/useEffect)
- [React Router](https://reactrouter.com/start/modes)
- [lazy](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [useTransition](https://react.dev/reference/react/useTransition)
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [useActionState](https://react.dev/reference/react/useActionState)
- [useOptimistic](https://react.dev/reference/react/useOptimistic)
- [Using TypeScript with React](https://react.dev/learn/typescript)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
