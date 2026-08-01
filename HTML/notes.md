# HTML Notes

## What is HTML?

- HTML = HyperText Markup Language
- Used to define the **structure** of a webpage.
- HTML describes content; CSS styles it; JavaScript adds behavior.

---

# Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

---

# Semantic Tags

These make the page structure meaningful.

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<aside></aside>
<footer></footer>
```

Prefer semantic tags over unnecessary `<div>`s.

---

# Headings

```html
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
```

- `h1` should generally appear only once per page.

---

# Paragraph

```html
<p></p>
```

---

# Links

```html
<a href="https://example.com">Example</a>
```

Useful attributes:

```html
target="_blank"
```

Opens link in a new tab.

```html
rel="noopener noreferrer"
```

Recommended whenever using `target="_blank"`.

---

# Images

```html
<img src="image.png" alt="Description">
```

Important attributes:

- `src`
- `alt`

`alt` is displayed if the image cannot load and is used by screen readers.

---

# Lists

Ordered

```html
<ol>
    <li>Item</li>
</ol>
```

Unordered

```html
<ul>
    <li>Item</li>
</ul>
```

---

# Div

```html
<div></div>
```

Used to create containers/divisions.

`div` has **no semantic meaning**.

---

# Span

```html
<span></span>
```

Inline container.

---

# Forms

```html
<form>
</form>
```

## Label

```html
<label for="username">Username</label>
```

`for` should match the input's `id`.

---

## Input

```html
<input>
```

Useful attributes:

```
type
id
name
placeholder
required
value
```

Common input types:

```
text
password
email
number
radio
checkbox
file
date
```

### id

Unique identifier.

### name

Used while submitting form data (`GET` / `POST`).

### placeholder

Grey hint text.

### required

Makes input mandatory.

### value

Assigns a value.

Useful for radio buttons.

---

## Radio Buttons

```html
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
```

Inputs with the same `name` belong to one group.

---

## Dropdown

```html
<select>

    <option>India</option>
    <option>Japan</option>

</select>
```

---

# Buttons

```html
<button>Submit</button>
```

---

# Media

## Image

```html
<img src="" alt="">
```

## Video

```html
<video controls>

</video>
```

Useful attributes

```
controls
autoplay
muted
loop
```

---

## Audio

```html
<audio controls>

</audio>
```

Useful attributes

```
controls
autoplay
loop
```

---

# iframe

Used to embed another webpage.

Example (YouTube):

```html
<iframe
src="https://www.youtube.com/embed/VIDEO_ID"
allowfullscreen>
</iframe>
```

---

# Tables

```html
<table>

<tr>
    <th>Name</th>
    <th>Age</th>
</tr>

<tr>
    <td>Abhinav</td>
    <td>20</td>
</tr>

</table>
```

Tags:

```
table
tr
th
td
border
rowspan
colspan
```

---

# Comments

```html
<!-- Comment -->
```

---

# Common Attributes

```
id
class
style
title
hidden
```

---

# HTML vs CSS vs JavaScript

HTML
- Structure

CSS
- Styling

JavaScript
- Functionality

---

# Things to Remember

- Use semantic tags whenever possible.
- Every page should have one `h1`.
- Every `<img>` should have an `alt`.
- Every `<label>` should point to an input using `for`.
- Use `required` for mandatory inputs.
- `name` is important for form submission.
- `target="_blank"` opens links in a new tab.
- Prefer semantic HTML over filling everything with `<div>`.