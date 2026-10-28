# React: Memoization, Refs, Forms, and Context

This section covers tools that help you manage component rendering, values that should persist between renders, form validation, and state shared across a component tree.

> **General rule:** make the code correct and easy to understand first. Add memoization when it solves a real performance problem; it is an optimization, not a requirement for every component.

---

# 1. `React.memo`

`memo` can skip rendering a component when its props are unchanged compared with the previous render. By default, React compares each prop using `Object.is`.

```jsx
import { memo, useState } from "react";

const Sum = memo(function Sum({ limit }) {
  let total = 0;
  for (let i = 0; i < limit; i++) {
    total += i;
  }

  console.log("Sum rendered");
  return <h2>Sum: {total}</h2>;
});

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <main className={theme}>
      <button
        onClick={() => setTheme(current => current === "light" ? "dark" : "light")}
      >
        Toggle theme
      </button>
      <Sum limit={100} />
    </main>
  );
}
```

Changing `theme` re-renders `App`. Since `limit` remains the same, `memo` can skip rendering `Sum` for that update.

### Important details

- `memo` is most useful when a component renders often with the same props and its render work is significant.
- It does **not** prevent a component from re-rendering when its own state changes or when a Context it reads changes.
- If a prop is a newly created object, array, or function on every render, its reference changes and the default comparison sees it as different.
- React treats memoization as an optimization. Code must remain correct even if React renders a component again.

---

# 2. `useMemo`

`useMemo` caches the **result of a calculation** between renders while its dependencies remain unchanged.

```jsx
import { useMemo, useState } from "react";

export default function App() {
  const [num, setNum] = useState(100);

  const total = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < num; i++) {
      sum += i;
    }
    return sum;
  }, [num]);

  return (
    <>
      <h1>Sum: {total}</h1>
      <button onClick={() => setNum(current => current + 10)}>
        Increase limit: {num}
      </button>
    </>
  );
}
```

The calculation runs on the initial render and is recalculated when `num` changes. A re-render caused by an unrelated state change can reuse the cached result.

### Remember

- The dependency array must include every reactive value used by the calculation.
- Dependencies are compared using `Object.is`.
- `useMemo` is for performance optimization; do not rely on it for correctness or as permanent storage.
- Avoid it for trivial calculations unless there is a concrete reason to memoize.

---

# 3. `useCallback`

`useCallback` caches a **function reference** between renders while its dependencies remain unchanged.

```jsx
import { useCallback, useState } from "react";

export default function App() {
  const [num, setNum] = useState(100);

  const handleClick = useCallback(() => {
    console.log("Current number:", num);
  }, [num]);

  return (
    <>
      <h1>Number: {num}</h1>
      <button onClick={() => setNum(current => current + 10)}>
        Increment
      </button>
      <button onClick={handleClick}>Log number</button>
    </>
  );
}
```

Here `handleClick` is reused between renders as long as `num` is unchanged. When `num` changes, React returns the function created for the new render.

### `useMemo` vs `useCallback`

| API | What it caches |
|---|---|
| `useMemo(() => calculate(), deps)` | A calculated value |
| `useCallback(() => doSomething(), deps)` | A function reference |
| `memo(Component)` | Can skip a component render when props are unchanged |

`useCallback` does not mean JavaScript never creates a function during rendering. React can return the cached function reference instead when dependencies are unchanged.

---

# 4. Object and function props

Consider:

```jsx
<Child options={{ color: "blue" }} />
```

The object literal creates a new object whenever the parent renders. The new reference can make a memoized `Child` render again even if the contents look identical.

When stable identity matters, `useMemo` can cache the object:

```jsx
const options = useMemo(() => ({ color: "blue" }), []);
return <Child options={options} />;
```

Similarly, `useCallback` can stabilize a callback passed to a memoized child. Do not add these wrappers automatically; first check whether they are useful.

---

# 5. `useRef`

`useRef(initialValue)` returns a stable object with a mutable `.current` property. The same ref object is retained between renders, and changing `.current` does **not** trigger a re-render.

Common uses:

- Holding a DOM element reference.
- Keeping an interval or timeout ID.
- Storing mutable information that does not need to appear in the rendered UI.

Use **state** for values that should update the UI. Use a **ref** for values React does not need to render.

## Example A: timer with an interval ID ref

```jsx
import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalIdRef = useRef(null);

  function handleStart() {
    if (intervalIdRef.current !== null) return;

    intervalIdRef.current = setInterval(() => {
      setSeconds(current => current + 1);
    }, 1000);
  }

  function handleStop() {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  function handleReset() {
    handleStop();
    setSeconds(0);
  }

  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <section>
      <h1>Time: {seconds}s</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </section>
  );
}
```

The ref stores the interval ID without causing an extra render. The displayed seconds are stored in state because they must update the UI. The cleanup clears any running interval when the component unmounts.

## Example B: access an input element

```jsx
import { useRef } from "react";

export default function NameForm() {
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Input value: ${inputRef.current.value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

React assigns the DOM input to `inputRef.current` after mounting. This is an example of an **uncontrolled input**: React does not store every keystroke in state.

---

# 6. React Hook Form

React Hook Form is a library for managing form values, validation, and submission. It is designed to minimize unnecessary re-renders, but it is better not to think of it simply as “a wrapper around `useRef`”.

Install it:

```bash
npm install react-hook-form
```

## Basic example

```jsx
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", {
            required: "Name cannot be empty",
            minLength: { value: 3, message: "Enter at least 3 characters" }
          })}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register("age", {
            valueAsNumber: true,
            required: "Age is required",
            min: { value: 10, message: "Minimum age is 10" },
            max: { value: 80, message: "Maximum age is 80" }
          })}
        />
        {errors.age && <p role="alert">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register("password")} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

Important points:

- `register()` connects an input to React Hook Form.
- `handleSubmit(onSubmit)` validates the form and then calls `onSubmit` with the form data when valid.
- Validation messages are available through `formState.errors`.
- Export the component as `export default Form;` — do not call it as `export default Form();`.

---

# 7. Zod schema validation

Zod lets you describe and validate the expected shape of data with a schema. It works with React Hook Form through `@hookform/resolvers`.

Install the packages:

```bash
npm install zod @hookform/resolvers
```

## Example schema (Zod 4 syntax)

```jsx
import { z } from "zod";

const formSchema = z.object({
  name: z.string()
    .min(3, "Minimum length is 3")
    .max(20, "Maximum length is 20"),
  email: z.email("Email is invalid"),
  age: z.number()
    .int("Age must be a whole number")
    .min(10, "Minimum age is 10")
    .max(80, "Maximum age is 80"),
  password: z.string()
    .min(5, "Minimum length is 5")
    .max(20, "Maximum length is 20"),
  confirm: z.string()
}).refine(data => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"]
});
```

For Zod 3, the email expression is commonly written as `z.string().email("Email is invalid")`; check the API for the installed version.

## Connect Zod to React Hook Form

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
  email: z.email("Email is invalid"),
  age: z.number().int().min(10).max(80),
  password: z.string().min(5).max(20),
  confirm: z.string()
}).refine(data => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"]
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(formSchema) });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p role="alert">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirm">Confirm password:</label>
        <input id="confirm" type="password" {...register("confirm")} />
        {errors.confirm && <p role="alert">{errors.confirm.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

The `valueAsNumber: true` option is important for numeric inputs: HTML input values are strings by default, while the schema above expects a number.

---

# 8. Lifting state up

**Lifting state up** means moving state to the closest common ancestor of the components that need to read or change it.

Suppose both `Header` and `Counter` need the same `count`. Put the state in `App` and pass values/callbacks down as props:

```jsx
import { useState } from "react";

function Header({ count }) {
  return <h1>Count: {count}</h1>;
}

function Counter({ count, onIncrement }) {
  return <button onClick={onIncrement}>Increment ({count})</button>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header count={count} />
      <Counter count={count} onIncrement={() => setCount(current => current + 1)} />
    </>
  );
}
```

Both components stay in sync because they read the same state owned by their common parent.

---

# 9. Prop drilling

**Prop drilling** means passing a prop through intermediate components that do not use it themselves, only so a deeper descendant can receive it.

```text
App (owns user)
  ↓ user prop
Layout (does not use user)
  ↓ user prop
Sidebar (does not use user)
  ↓ user prop
Profile (needs user)
```

Prop drilling can make data flow verbose, but it does **not automatically mean the application is inefficient** or that every intermediate component must re-render expensively. Props are often the clearest solution for direct relationships. Consider Context when many descendants need the same value or repeated forwarding becomes awkward.

---

# 10. Context and `useContext`

Context lets a component provide a value to components below it in the tree without forwarding that value through every intermediate component's props.

The two main pieces are:

- **Provider:** supplies the value to a subtree.
- **Consumer:** a component that reads the value, commonly with `useContext()`.

## Example: shared counter state

```jsx
import { createContext, useContext, useState } from "react";

const CountContext = createContext(null);

function Header() {
  const { count } = useContext(CountContext);
  return <h1>Count: {count}</h1>;
}

function Counter() {
  const { setCount } = useContext(CountContext);
  return (
    <button onClick={() => setCount(current => current + 1)}>
      Increment
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const value = { count, setCount };

  return (
    <CountContext.Provider value={value}>
      <Header />
      <Counter />
    </CountContext.Provider>
  );
}
```

When `count` changes, React updates components that read this Context value. In this example, `value` is recreated during each `App` render; that is fine for a basic example. In a performance-sensitive component tree, you can consider stabilizing provider values after measuring the impact.

### When is Context useful?

Common examples include:

- Theme (light/dark mode)
- Current user or authentication information
- Locale/language
- State shared across distant components

### When should you prefer props?

Use props when the data relationship is straightforward and explicit. Do not move every value into Context just because you can. Context is a data-sharing mechanism, not a complete state-management solution by itself.

---

# 11. Quick comparison

| Need | Usually use |
|---|---|
| A value that changes what the UI displays | `useState` |
| A mutable value that should survive renders but not trigger them | `useRef` |
| Avoid recomputing an expensive pure calculation unnecessarily | `useMemo` |
| Preserve a function reference when that identity matters | `useCallback` |
| Skip a child render when its props are unchanged | `memo` / `React.memo` |
| Share data with many descendants | Context + `useContext` |
| Manage form values, validation, submission | React Hook Form |
| Define reusable input validation rules | Zod (often with `zodResolver`) |

---

# Key takeaways

1. `memo`, `useMemo`, and `useCallback` solve related but different optimization problems.
2. Measure before optimizing; do not use memoization as a replacement for good component design.
3. Ref changes do not cause renders; state updates do.
4. Always clean up timers and external resources when they are no longer needed.
5. React Hook Form can simplify forms; Zod can centralize and reuse validation rules.
6. Lift state to a common ancestor when multiple components need shared state.
7. Context avoids repeated prop forwarding, but it should not replace props everywhere.

## Official references

- [React `memo`](https://react.dev/reference/react/memo)
- [React `useMemo`](https://react.dev/reference/react/useMemo)
- [React `useCallback`](https://react.dev/reference/react/useCallback)
- [React `useRef`](https://react.dev/reference/react/useRef)
- [Passing data deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React Hook Form: `useForm`](https://react-hook-form.com/docs/useform)
- [Zod documentation](https://zod.dev/)
