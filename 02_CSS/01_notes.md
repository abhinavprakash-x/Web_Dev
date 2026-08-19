# CSS Notes

# What is CSS?

**CSS (Cascading Style Sheets)** controls the **presentation** of HTML documents.

---

# Ways to Add CSS

## 1. Inline CSS

```html
<h1 style="color:blue;">Hello</h1>
```

- Highest normal priority
- Not reusable

---

## 2. Internal CSS

```html
<head>
<style>
h1{
    color:green;
}
</style>
</head>
```

---

## 3. External CSS

```html
<head>
<link rel="stylesheet" href="./styles.css">
</head>
```

---

# CSS Syntax

```css
selector{
    property:value;
}
```

---

# CSS Selectors

## Tag Selector

```css
h1{
    color:blue;
}
```

Selects every `<h1>`.

---

## ID Selector

```css
#title{
    color:red;
}
```

IDs should be unique.

---

## Class Selector

```css
.heading{
    color:green;
}
```

Classes can be reused.

---

## Group Selector

```css
h1,p,.box{
    color:red;
}
```

---

## Universal Selector

```css
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
```

Selects every element.

---

## Descendant Selector

```css
div p{
    color:red;
}
```

Every `<p>` inside a `<div>`.

---

## Child Selector

```css
div > p{
    color:red;
}
```

Only direct children.

---

## Attribute Selector

```css
input[type="text"]{
    border:1px solid black;
}
```

---

# CSS Cascade & Specificity

Priority (Low → High)

1. Browser default
2. Tag selector
3. Class selector
4. ID selector
5. Inline CSS
6. `!important`

If two rules have the same specificity, **the one written later wins.**

Approximate specificity:

| Selector | Score |
|-----------|------:|
| Tag | 1 |
| Class | 10 |
| ID | 100 |
| Inline | 1000 |

---

# Colors

## Named

```css
color:red;
```

## RGB

```css
color:rgb(255,0,0);
```

Range: 0–255

---

## RGBA

```css
color:rgba(255,0,0,0.5);
```

Alpha:
- 0 → Transparent
- 1 → Opaque

---

## HEX

```css
color:#FF33AA;
```

Format:

```
#RRGGBB
```

---

## HSL and HSLA

```css
color:hsl(0,100%,50%);
color:hsla(0,100%,50%,0.3);
```

Hue • Saturation • Lightness • Transparency

---

# Units

## px

Absolute unit.

```css
font-size:20px;
```

---

## em

Relative to parent font-size.

```css
font-size:2em;
```

Parent = 20px

Result = 40px

---

## rem

Relative to root (`html`) font-size.

---

## %

Relative to parent.

---

## vw

Viewport Width

```
1vw = 1% of browser width
```

---

## vh

Viewport Height

```
1vh = 1% of browser height
```

---

# Fonts

## Font Family

```css
font-family:"Poppins",Arial,sans-serif;
```

Browser checks left to right.

---

## Font Size

```css
font-size:32px;
```

---

## Font Weight

```css
font-weight:100;
font-weight:400;
font-weight:700;
font-weight:bold;
```

---

## Font Style

```css
font-style:italic;
```

Values:

- normal
- italic
- oblique

---

## Text Decoration

```css
text-decoration:underline;
```

Other values:

- none
- overline
- line-through

---

# Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
rel="stylesheet">
```

---

# Box Model

```
+------------------------+
|        Margin          |
|  +------------------+  |
|  |      Border      |  |
|  | +--------------+ |  |
|  | |   Padding    | |  |
|  | | +----------+ | |  |
|  | | | Content  | | |  |
|  | | +----------+ | |  |
|  | +--------------+ |  |
|  +------------------+  |
+------------------------+
```

- Content → Actual data
- Padding → Space inside border
- Border → Boundary
- Margin → Space outside border

---

## Border

```css
border:2px solid black;
border-radius:10px;
```

Individual borders:

```css
border-top:
border-right:
border-bottom:
border-left:
```

---

## Padding

```css
padding:10px;
padding:10px 20px;
padding:10px 20px 30px 40px;
```

Order:

```
Top Right Bottom Left
```

---

## Margin

```css
margin:20px;
margin:10px 20px;
margin:10px 20px 30px 40px;
```

Order:

```
Top Right Bottom Left
```

---

## Margin Collapse

Vertical margins collapse.

If two elements each have

```css
margin:20px 0;
```

Gap = **20px**, not 40px.

---

## Box Sizing

### content-box (Default)

```
width = content only
```

```css
box-sizing:content-box;
```

---

### border-box

```
width = content + padding + border
```

```css
box-sizing:border-box;
```

Preferred.

---

# Display

## Block

Examples

- div
- h1
- p

Properties

- Starts on new line
- Full available width
- Width & height work
- Margin & padding work

---

## Inline

Examples

- span
- a

Properties

- Only content width
- No new line
- Width & height generally ignored
- Horizontal padding/margin behave normally

---

## Inline-block

Hybrid of block and inline.

```css
display:inline-block;
```

---

## None

```css
display:none;
```

Removed completely.

---

## Visibility

```css
visibility:hidden;
```

Invisible but still occupies space.

---

# Span

`<span>` selects a small portion inside another element.

---

# Position

## static

Default positioning.

---

## relative

Moves relative to original position.

Original space remains reserved.

---

## absolute

Removed from normal flow.

Positioned relative to nearest ancestor having:

- relative
- absolute
- fixed
- sticky

Otherwise relative to viewport.

---

## fixed

Relative to browser window.

Doesn't move while scrolling.

Removed from normal flow.

Useful for navbars.

---

## sticky

Acts like relative.

Becomes fixed after reaching a specified scroll position.

---

# z-index

Controls stacking order.

```css
z-index:10;
```

Higher value = appears on top.

Default is usually 0 (auto).

---

# Overflow

```css
overflow:hidden;
overflow:scroll;
overflow:auto;
overflow:visible;
```

---

# Inheritance

Inherited:

- color
- font-family
- font-size

Not inherited:

- margin
- padding
- border

---

# !important

```css
h1{
    color:red !important;
}
```

Overrides normal cascade.

Use sparingly.

---