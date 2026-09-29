# DOM — Document Object Model

The **DOM (Document Object Model)** is a programming interface that represents an HTML document as a **tree of objects (nodes)**.

JavaScript can use the DOM to:

- Read HTML elements
- Change their content
- Change their attributes
- Change their styles
- Create new elements
- Remove elements
- Respond to user interactions through events

In simple terms:

> **HTML creates the structure → CSS styles it → JavaScript manipulates it through the DOM.**

---

# 1. HTML → DOM

Consider this HTML:

```html
<h1 id="title">Hello World</h1>
```

The browser parses the HTML and creates a DOM representation of it.

Conceptually, the element can be thought of as an object containing information such as:

```js
{
    tagName: "H1",
    id: "title",
    textContent: "Hello World"
}
```

The actual DOM object contains **many more properties and methods** than this simplified example.

JavaScript can access that object:

```js
const titleElement = document.getElementById("title");

titleElement.textContent = "Hello DOM";
```

The page changes from:

```text
Hello World
```

to:

```text
Hello DOM
```

The DOM therefore acts as the bridge between **JavaScript and the HTML document**.

---

# 2. `window` and `document`

In a browser, `window` represents the browser window and serves as the **global object** for the page.

The `document` object represents the HTML document loaded in that window.

Conceptually:

```text
Window
  └── Document
       └── HTML
            ├── Head
            └── Body
```

For example:

```js
window.alert("Hello World");

window.document.getElementById("title").textContent = "Hello DOM";
```

Because `window` is the global object in browser JavaScript, its properties and methods can generally be accessed without explicitly writing `window.`:

```js
alert("Hello World");

document.getElementById("title").textContent = "Hello DOM";
```

So these are equivalent in normal browser code:

```js
window.alert("Hello World");
```

```js
alert("Hello World");
```

And:

```js
window.document
```

```js
document
```

### Important

`window` is **browser-specific**. It is not a universal JavaScript object in every environment.

---

# 3. The DOM Tree

The DOM represents the document as a **tree structure**.

For example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>

<body>
    <h1>Hello</h1>
    <p>Welcome!</p>
    <div>Content</div>
</body>
</html>
```

Conceptually:

```text
Document
└── HTML
    ├── HEAD
    │   └── TITLE
    │       └── "My Page"
    │
    └── BODY
        ├── H1
        │   └── "Hello"
        │
        ├── P
        │   └── "Welcome!"
        │
        └── DIV
            └── "Content"
```

This tree represents relationships between nodes.

For example:

```text
BODY
 ├── H1
 ├── P
 └── DIV
```

Here:

- `BODY` is the **parent** of `H1`, `P`, and `DIV`.
- `H1`, `P`, and `DIV` are **children** of `BODY**.
- `H1`, `P`, and `DIV` are also **siblings** of each other.

---

# 4. Nodes

Everything in the DOM is represented as a **node**.

Common node types include:

- Document nodes
- Element nodes
- Text nodes
- Comment nodes

For example:

```html
<h1>Hello</h1>
```

contains:

```text
Element node
└── H1
    └── Text node
        └── "Hello"
```

This distinction becomes useful when working with the DOM tree directly.

---

# 5. Selecting Elements

Before modifying an element, JavaScript usually needs to **select** it.

## `getElementById()`

Selects an element by its ID:

```js
const title = document.getElementById("title");
```

Example:

```html
<h1 id="title">Hello</h1>
```

---

## `getElementsByClassName()`

Selects elements having a particular class:

```js
const items = document.getElementsByClassName("item");
```

It returns an **HTMLCollection**.

---

## `getElementsByTagName()`

Selects elements by their tag name:

```js
const paragraphs = document.getElementsByTagName("p");
```

---

## `querySelector()`

Selects the **first** element matching a CSS selector:

```js
const title = document.querySelector("#title");
```

Class:

```js
const item = document.querySelector(".item");
```

Tag:

```js
const paragraph = document.querySelector("p");
```

More complex CSS selector:

```js
const item = document.querySelector(".container .item");
```

---

## `querySelectorAll()`

Selects **all** elements matching a CSS selector:

```js
const items = document.querySelectorAll(".item");
```

It returns a **NodeList**.

Example:

```js
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    console.log(button.textContent);
});
```

---

# 6. Quick Selector Comparison

| Method | Selects | Result |
|---|---|---|
| `getElementById()` | One ID | Element / `null` |
| `getElementsByClassName()` | Matching classes | HTMLCollection |
| `getElementsByTagName()` | Matching tags | HTMLCollection |
| `querySelector()` | First CSS match | Element / `null` |
| `querySelectorAll()` | All CSS matches | NodeList |

### General rule

For modern code, `querySelector()` and `querySelectorAll()` are extremely useful because they accept normal CSS selectors.

---

# 7. Changing Content

There are three commonly encountered properties:

```js
element.innerHTML
element.textContent
element.innerText
```

They are **not identical**.

---

## `textContent`

Gets or sets the text content of an element.

```js
title.textContent = "Hello DOM";
```

If the element contains nested HTML:

```html
<div id="box">
    Hello
    <strong>World</strong>
</div>
```

then:

```js
box.textContent;
```

returns the text content, including text inside the nested element:

```text
Hello World
```

It does not interpret a string as HTML.

For example:

```js
box.textContent = "<strong>Hello</strong>";
```

will display:

```text
<strong>Hello</strong>
```

rather than creating a `<strong>` element.

---

# 8. `innerHTML`

`innerHTML` gets or sets the HTML markup **inside** an element.

```js
box.innerHTML = "<strong>Hello</strong>";
```

Now the browser interprets the string as HTML:

```html
<div id="box">
    <strong>Hello</strong>
</div>
```

You can also read it:

```js
console.log(box.innerHTML);
```

### Important

Because `innerHTML` parses strings as HTML, inserting untrusted user input through it can create **XSS/security problems**.

For plain text, prefer:

```js
element.textContent = userInput;
```

---

# 9. `innerText`

`innerText` deals with the **rendered/visible text** of an element and is affected by CSS and layout.

For example:

```js
element.innerText;
```

can differ from:

```js
element.textContent;
```

because `innerText` considers whether text is actually rendered.

### Practical distinction

```text
textContent → text in the DOM
innerText   → rendered/visible text
innerHTML   → HTML markup inside the element
```

---

# 10. Creating Elements

JavaScript can create completely new DOM elements.

```js
const paragraph = document.createElement("p");
```

Then set its content:

```js
paragraph.textContent = "Hello from JavaScript!";
```

And add it to the document:

```js
document.body.appendChild(paragraph);
```

Result:

```html
<body>
    ...
    <p>Hello from JavaScript!</p>
</body>
```

---

# 11. CRUD Operations in the DOM

DOM manipulation can be thought of using the familiar **CRUD** idea.

## Create

Create a new element:

```js
const div = document.createElement("div");
```

Add it:

```js
document.body.appendChild(div);
```

---

## Read

Read information from an element:

```js
const title = document.querySelector("h1");

console.log(title.textContent);
```

---

## Update

Change content:

```js
title.textContent = "New Title";
```

Change attributes:

```js
title.setAttribute("id", "newTitle");
```

Change classes:

```js
title.classList.add("important");
```

---

## Delete

Remove an element:

```js
title.remove();
```

Older code may use:

```js
parent.removeChild(title);
```

---

# 12. Common DOM Manipulation Methods

### Creating

```js
document.createElement("div");
```

### Adding

```js
parent.appendChild(child);
```

Modern alternatives include:

```js
parent.append(child);
```

and:

```js
parent.prepend(child);
```

### Removing

```js
element.remove();
```

### Attributes

```js
element.setAttribute("class", "box");
element.getAttribute("class");
element.removeAttribute("class");
```

### Classes

```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

---

# 13. DOM Events

An **event** is something that happens in the browser.

Examples:

- User clicks a button
- User presses a key
- Mouse moves
- An input receives focus
- A form is submitted
- The page finishes loading
- The window is resized

JavaScript can respond to these events using **event listeners**.

---

# 14. `addEventListener()`

The general syntax is:

```js
element.addEventListener(eventType, callback);
```

Example:

```html
<button id="myButton">Click Me</button>
```

```js
const button = document.getElementById("myButton");

button.addEventListener("click", () => {
    alert("Button clicked!");
});
```

When the button is clicked, the callback function runs.

This is an example of a **callback function**:

```js
() => {
    alert("Button clicked!");
}
```

The browser calls it when the specified event occurs.

---

# 15. Inline Event Handlers

You may also see:

```html
<button onclick="handleClick()">
    Click Me
</button>
```

with:

```js
const handleClick = () => {
    alert("Button clicked!");
};
```

This works, but for most application code, keeping JavaScript separate from HTML and using:

```js
addEventListener()
```

is generally cleaner.

Preferred:

```js
const button = document.getElementById("myButton");

button.addEventListener("click", handleClick);
```

---

# 16. Common Events

Some common DOM events are:

| Event | Meaning |
|---|---|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mousedown` | Mouse button is pressed |
| `mouseup` | Mouse button is released |
| `mousemove` | Mouse moves |
| `mouseover` | Pointer moves over an element |
| `mouseout` | Pointer leaves an element |
| `keydown` | Key is pressed |
| `keyup` | Key is released |
| `focus` | Element receives focus |
| `blur` | Element loses focus |
| `submit` | Form is submitted |

Example:

```js
input.addEventListener("keydown", () => {
    console.log("Key pressed");
});
```

---

# 17. The Event Object

When an event occurs, the browser provides an **event object** containing information about that event.

Example:

```js
const handleClick = (event) => {
    console.log("Event type:", event.type);
    console.log("Target:", event.target);
};
```

Then:

```js
button.addEventListener("click", handleClick);
```

For a click, `event` contains information such as:

```js
event.type
event.target
```

---

## `event.target`

`event.target` is the element on which the event originally occurred.

Example:

```js
button.addEventListener("click", (event) => {
    console.log(event.target);
});
```

If the button is clicked, the button will be the target.

---

# 18. Event Propagation

Events don't necessarily stay on the element where they occurred.

They propagate through the DOM.

The propagation process has three conceptual phases:

```text
1. Capturing phase
2. Target phase
3. Bubbling phase
```

---

# 19. Event Capturing

During the **capturing phase**, the event travels from the outer part of the DOM toward the target.

Conceptually:

```text
Window
  ↓
Document
  ↓
HTML
  ↓
Parent
  ↓
Button
```

You can register a capturing listener using the third argument:

```js
parentElement.addEventListener(
    "click",
    () => {
        console.log("Parent clicked during capture");
    },
    true
);
```

The `true` means the listener is registered for the **capturing phase**.

---

# 20. Event Bubbling

After reaching the target, the event can propagate back upward through its ancestors.

Conceptually:

```text
Button
  ↑
Parent
  ↑
Body
  ↑
HTML
  ↑
Document
```

This is called **event bubbling**.

For example:

```js
parentElement.addEventListener("click", () => {
    console.log("Parent clicked!");
});
```

If a child inside `parentElement` is clicked, the event can bubble up to the parent.

---

# 21. Capturing vs Bubbling

```text
CAPTURING

Document
   ↓
 Parent
   ↓
 Button
   ↓
 TARGET


BUBBLING

TARGET
   ↑
 Button
   ↑
 Parent
   ↑
Document
```

Most event listeners you write use the default **bubbling phase**:

```js
element.addEventListener("click", handler);
```

Capturing can be requested with:

```js
element.addEventListener("click", handler, true);
```

---

# 22. Why Event Bubbling Is Useful

Event bubbling makes **event delegation** possible.

Instead of adding listeners to many individual elements:

```js
buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});
```

you can sometimes attach one listener to a parent:

```js
container.addEventListener("click", (event) => {
    console.log(event.target);
});
```

The parent receives bubbled events from its children.

This becomes especially useful when elements are dynamically created.

---

# 23. Big Picture

The DOM connects your JavaScript code to the webpage.

```text
HTML
 │
 ▼
Browser parses HTML
 │
 ▼
DOM Tree
 │
 ▼
JavaScript
 │
 ├── Select elements
 ├── Read content
 ├── Change content
 ├── Change attributes
 ├── Change classes
 ├── Create elements
 ├── Remove elements
 └── Listen for events
```

The basic workflow is:

```text
SELECT
   ↓
READ / MODIFY
   ↓
LISTEN FOR EVENTS
   ↓
RESPOND TO USER
```

For example:

```js
const button = document.querySelector("#myButton");
const title = document.querySelector("#title");

button.addEventListener("click", () => {
    title.textContent = "Button was clicked!";
});
```

Here:

1. `querySelector()` **selects** the elements.
2. `addEventListener()` **listens** for a click.
3. The callback **runs