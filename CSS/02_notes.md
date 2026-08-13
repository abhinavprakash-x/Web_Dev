# CSS Notes — Flexbox, Grid, Responsive Design, Shadows & Motion

> A polished continuation of the CSS notes: layouts first, then
> responsive design and visual effects.

------------------------------------------------------------------------

# 1. Flexbox

**Flexbox** is a CSS layout system for arranging elements dynamically
without manually calculating the position of every element.

It is especially useful when elements need to be arranged in **one
direction**: a row or a column.

### Terminology

- **Parent** → flex container
- **Direct children** → flex items

``` css
.container {
    display: flex;
}
```

`display: flex` creates a flex formatting context. The direct children
become flex items; it is more accurate to say this than simply saying
that Flexbox makes them `inline-block`.

------------------------------------------------------------------------

# 2. Main Axis and Cross Axis

Flexbox always has two axes:

- **Main axis** → the direction in which items are laid out.
- **Cross axis** → perpendicular to the main axis.

| `flex-direction` | Main axis  | Cross axis |
|------------------|------------|------------|
| `row`            | horizontal | vertical   |
| `row-reverse`    | horizontal | vertical   |
| `column`         | vertical   | horizontal |
| `column-reverse` | vertical   | horizontal |

``` text
flex-direction: row

Main axis  ─────────────────────→
Cross axis
     │
     ↓
```

``` text
flex-direction: column

Cross axis  ←────────────→
                │
                ↓
           Main axis
```

The two rules worth memorising are:

``` text
justify-content → main axis
align-items     → cross axis
```

Do not memorise these as simply “horizontal” and “vertical” because
changing `flex-direction` changes the axes.

------------------------------------------------------------------------

# 3. `flex-direction`

Controls the direction in which flex items are placed.

``` css
.container {
    display: flex;
    flex-direction: row;
}
```

Values:

``` css
row;
row-reverse;
column;
column-reverse;
```

Examples:

``` text
row:           1 → 2 → 3 → 4
row-reverse:   4 → 3 → 2 → 1

column:        1
               ↓
               2
               ↓
               3

column-reverse: 3
                ↓
                2
                ↓
                1
```

Default:

``` css
flex-direction: row;
```

------------------------------------------------------------------------

# 4. `justify-content`

Controls how flex items are distributed along the **main axis**.

``` css
.container {
    display: flex;
    justify-content: center;
}
```

Common values:

``` css
flex-start;
flex-end;
center;
space-between;
space-around;
space-evenly;
```

Examples:

``` text
center:
|        [1] [2] [3]        |

space-between:
| [1]              [2]              [3] |

space-around:
|   [1]          [2]          [3]   |

space-evenly:
|    [1]      [2]      [3]    |
```

`justify-content: center` is therefore not necessarily horizontal
centering. With `flex-direction: column`, it centers along the vertical
main axis.

------------------------------------------------------------------------

# 5. `align-items`

Controls alignment along the **cross axis**.

``` css
.container {
    display: flex;
    align-items: center;
}
```

Common values:

``` css
flex-start;
flex-end;
center;
stretch;
baseline;
```

For the default `flex-direction: row`, the cross axis is vertical, so
`align-items: center` vertically centers the items.

------------------------------------------------------------------------

# 6. `flex-wrap`

By default, flex items try to remain on one line:

``` css
flex-wrap: nowrap;
```

Allow them to move onto additional lines with:

``` css
.container {
    display: flex;
    flex-wrap: wrap;
}
```

``` text
Without wrapping:
[1] [2] [3] [4] [5] [6]

With wrapping:
[1] [2] [3] [4]
[5] [6]
```

This is useful for responsive layouts. The wrapping happens inside the
flex container; it is not specifically a “phone” feature.

Useful values:

``` css
nowrap;
wrap;
wrap-reverse;
```

------------------------------------------------------------------------

# 7. `gap`

Creates space between flex items without adding margins to each child.

``` css
.container {
    display: flex;
    gap: 5px;
}
```

You can also write:

``` css
gap: 10px 20px;
```

where the first value is the row gap and the second is the column gap.
`row-gap` and `column-gap` can be used separately.

------------------------------------------------------------------------

# 8. Flex Item Properties

These are applied to the **children** rather than the parent.

Important properties:

``` css
flex-grow;
flex-shrink;
flex-basis;
flex;
align-self;
order;
```

## 8.1 `flex-grow`

Controls how an item receives **extra free space** along the main axis.

``` css
.item {
    flex-grow: 1;
}
```

If items have grow values:

``` css
.item1 { flex-grow: 1; }
.item2 { flex-grow: 2; }
.item3 { flex-grow: 1; }
```

extra space is distributed in a `1 : 2 : 1` ratio.

> `flex-grow: 1` does not literally mean “fill the whole screen”. It
> means the item is allowed to participate in distributing available
> free space.

## 8.2 `flex-shrink`

Controls how items shrink when there is not enough space.

``` css
.item {
    flex-shrink: 1;
}
```

Default:

``` css
flex-shrink: 1;
```

A larger shrink factor generally gives an item a larger share of the
negative free-space distribution, but the exact result also depends on
the item’s flex base size. So `4` does not simply mean “shrinks four
times faster” in every situation.

Prevent shrinking with:

``` css
flex-shrink: 0;
```

## 8.3 `flex-basis`

Defines the item’s initial size along the **main axis** before remaining
free space is distributed.

``` css
.item {
    flex-basis: 100px;
}
```

With `flex-direction: row`, this is width-like. With `column`, it is
height-like.

## 8.4 `flex` shorthand

`flex` is shorthand for:

``` text
flex-grow  flex-shrink  flex-basis
```

Example:

``` css
.item {
    flex: 1 1 200px;
}
```

means:

``` text
grow   = 1
shrink = 1
basis  = 200px
```

A very common pattern is:

``` css
.item {
    flex: 1;
}
```

which is useful for making items share available space.

## 8.5 `align-self`

Overrides the parent’s `align-items` for one particular flex item.

``` css
.container {
    display: flex;
    align-items: center;
}

.special {
    align-self: flex-start;
}
```

`flex-start` means the start of the **cross axis**, not necessarily
“top”.

## 8.6 `order`

Changes the visual order of flex items.

``` css
.item1 { order: 3; }
.item2 { order: 1; }
.item3 { order: 2; }
```

Visual order:

``` text
item2 → item3 → item1
```

Default:

``` css
order: 0;
```

> `order` changes visual layout order, not HTML source order. Use it
> carefully when logical reading order matters.

------------------------------------------------------------------------

# 9. Flexbox is 1-Dimensional

Flexbox is primarily a **one-dimensional layout system**. It lays items
out along a main axis while using the cross axis for alignment.

Use it when your layout is mainly about one direction:

``` text
[1] [2] [3] [4]
```

or:

``` text
[1]
[2]
[3]
[4]
```

When you need simultaneous control over rows and columns, CSS Grid is
often more suitable.

------------------------------------------------------------------------

# 10. CSS Grid

A useful mental model:

``` text
Flexbox → 1D
Grid    → 2D
```

Grid is designed to control **rows and columns together**.

Terminology:

``` text
Parent  → grid container
Children → grid items
```

Basic setup:

``` css
.container {
    display: grid;
}
```

------------------------------------------------------------------------

# 11. Grid Rows and Columns

You can explicitly define tracks:

``` css
.container {
    display: grid;
    grid-template-rows: 200px 200px;
    grid-template-columns: 200px 200px;
}
```

This creates two row tracks and two column tracks.

``` text
        200px       200px
      ┌─────────┬─────────┐
200px │         │         │
      ├─────────┼─────────┤
200px │         │         │
      └─────────┴─────────┘
```

------------------------------------------------------------------------

# 12. The `fr` Unit

`fr` means a **fraction of the available grid space**.

``` css
grid-template-columns: 1fr 1fr;
```

creates two equal columns.

Instead of:

``` css
grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
```

use:

``` css
grid-template-rows: repeat(10, 1fr);
```

This creates ten equal row tracks when there is space available to
distribute.

> `1fr` does not automatically eliminate all overflow. Content can still
> affect track sizing; `minmax()` is useful when you need tighter
> control.

------------------------------------------------------------------------

# 13. Making Grid Items Span More Space

A grid item can occupy multiple columns or rows.

``` css
.item {
    grid-column-start: 1;
    grid-column-end: 4;
}
```

This spans from column line 1 to column line 4, which means **three
column tracks**.

Similarly:

``` css
grid-row-start: 1;
grid-row-end: 3;
```

spans two row tracks.

### Shorthand

``` css
grid-row: 2 / 4;
grid-column: 1 / 3;
```

The numbers refer to **grid lines**, not directly to cell numbers.

------------------------------------------------------------------------

# 14. Media Queries and Responsive Websites

## What is a Responsive Website?

A **responsive website** adapts its layout and presentation to different
screen sizes and device conditions.

For example:

``` text
Phone                    Laptop
┌──────────┐             ┌──────────────────────┐
│          │             │                      │
│ Content  │             │       Content        │
│          │             │                      │
└──────────┘             └──────────────────────┘
```

Media queries let CSS apply different rules depending on conditions such
as viewport width.

------------------------------------------------------------------------

# 15. Media Query Syntax

Example:

``` css
@media screen and (max-width: 600px) {
    /* styles for a narrow viewport */
}
```

For example:

``` css
.container {
    display: flex;
    flex-direction: row;
}

@media screen and (max-width: 600px) {
    .container {
        flex-direction: column;
    }
}
```

`max-width` means the rule applies at that width **or below**.

``` css
@media (max-width: 600px) { }
```

`min-width` means the rule applies at that width **or above**.

``` css
@media (min-width: 600px) { }
```

The breakpoint is a design choice; `600px` is only an example.

------------------------------------------------------------------------

# 16. Mobile-First vs Desktop-First

### Desktop-first

Start with larger-screen styles and override them for smaller screens.

``` css
/* Desktop/base styles */

@media (max-width: 600px) {
    /* Smaller-screen changes */
}
```

### Mobile-first

Start with the smaller-screen layout and add enhancements for larger
screens.

``` css
/* Mobile/base styles */

@media (min-width: 600px) {
    /* Larger-screen changes */
}
```

Mobile-first is widely used, but it is not a universal rule. The right
approach depends on the project and its users.

------------------------------------------------------------------------

# 17. `box-shadow`

Adds a shadow around an element.

Basic form:

``` css
box-shadow: x-offset y-offset color;
```

Example:

``` css
box-shadow: 5px 5px black;
```

Add blur:

``` css
box-shadow: x-offset y-offset blur-radius color;
```

Example:

``` css
box-shadow: 5px 5px 10px black;
```

Add spread:

``` css
box-shadow: x-offset y-offset blur-radius spread-radius color;
```

Example:

``` css
box-shadow: 5px 5px 10px 3px black;
```

Spread expands or contracts the shadow. It can look like a border, but
it is **not an actual border**.

### `inset`

``` css
box-shadow: inset 5px 5px 10px black;
```

Without `inset`, the shadow is outside. With `inset`, the shadow is
inside the element, which can create a pressed/recessed effect.

------------------------------------------------------------------------

# 18. `overflow`

Controls content that extends outside an element’s box.

``` css
overflow: hidden;
```

Hides overflowing content.

``` css
overflow: scroll;
```

Provides scrolling for overflow content.

Other useful values:

``` css
overflow: visible;
overflow: auto;
```

`auto` is especially useful because scrollbars appear when needed rather
than always being forced.

------------------------------------------------------------------------

# 19. CSS Animations

CSS animations allow an element to change styles over time without
JavaScript.

An animation generally needs:

1.  An animation name.
2.  Animation properties.
3.  A `@keyframes` rule describing the stages.

Example:

``` css
.box {
    animation-name: move-box;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-delay: 2s;
}
```

Important properties:

``` css
animation-name:
animation-duration:
animation-timing-function:
animation-delay:
animation-iteration-count:
animation-direction:
animation-fill-mode:
animation-play-state:
```

------------------------------------------------------------------------

# 20. `@keyframes`

Defines what the animation does.

### `from` / `to`

``` css
@keyframes move-box {
    from {
        background-color: orange;
        left: 10px;
    }

    to {
        background-color: blue;
        left: 600px;
    }
}
```

If animating `left`, a positioned element is normally required:

``` css
.parent {
    position: relative;
}

.box {
    position: absolute;
}
```

For many movement animations, `transform: translateX(...)` is preferable
because it does not change normal layout flow and is generally a better
fit for smooth visual motion.

------------------------------------------------------------------------

# 21. Percentage Keyframes

Animations can contain multiple stages:

``` css
@keyframes move-box {
    0%   { }
    25%  { }
    50%  { }
    75%  { }
    100% { }
}
```

This provides much more control than only using `from` and `to`.

------------------------------------------------------------------------

# 22. `animation-timing-function`

Controls the rate at which an animation progresses between keyframes.

Common values:

``` css
linear
ease
ease-in
ease-out
ease-in-out
```

You can also use:

``` css
animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

Think of this as controlling **how the animation moves through time**,
rather than which CSS properties are animated.

------------------------------------------------------------------------

# 23. `animation-iteration-count`

Controls how many times an animation runs.

``` css
animation-iteration-count: 1;
animation-iteration-count: 5;
animation-iteration-count: infinite;
```

------------------------------------------------------------------------

# 24. `animation-direction`

Controls the direction in which the keyframes are played.

``` css
normal;
reverse;
alternate;
alternate-reverse;
```

``` text
normal:            0% → 100%
reverse:          100% → 0%
alternate:         0% → 100% → 0% → 100%
alternate-reverse: 100% → 0% → 100% → 0%
```

------------------------------------------------------------------------

# 25. `animation-delay`

Delays the start of an animation.

``` css
animation-delay: 2s;
```

The animation waits for 2 seconds before starting.

------------------------------------------------------------------------

# 26. `animation-fill-mode`

Controls what styles are applied **before and/or after** an animation.

### `none`

Default. Keyframe styles are not retained before the animation or after
it ends.

### `forwards`

After the animation ends, the element keeps the styles from the final
applicable keyframe.

``` text
0% ───────────→ 100%
                  ↑
              stays here
```

### `backwards`

During an animation delay, the element uses the styles from the first
applicable keyframe.

### `both`

Combines `backwards` and `forwards`: it applies the appropriate starting
keyframe during the delay and retains the final keyframe after
completion.

------------------------------------------------------------------------

# 27. `animation-play-state`

Controls whether the animation is running or paused.

``` css
animation-play-state: running;
animation-play-state: paused;
```

Example:

``` css
.box:hover {
    animation-play-state: paused;
}
```

------------------------------------------------------------------------

# 28. Animation Shorthand

Instead of writing every property separately:

``` css
animation-name: slide;
animation-duration: 3s;
animation-timing-function: linear;
animation-delay: 2s;
animation-iteration-count: infinite;
animation-direction: alternate;
animation-fill-mode: forwards;
```

use:

``` css
animation: slide 3s linear 2s infinite alternate forwards;
```

A useful conventional order is:

``` text
name duration timing-function delay iteration-count direction fill-mode play-state
```

Simple example:

``` css
animation: slide-in 3s ease-out;
```

Multiple animations are separated by commas:

``` css
animation: 3s linear slide-in, 3s ease-out 5s slide-out;
```

> Because both duration and delay are time values, putting the duration
> before the delay is the clearest convention.

------------------------------------------------------------------------

# 29. Transitions

A **transition** smoothly changes a CSS property from one value to
another when the property changes.

Example:

``` css
.box {
    transition-property: background-color;
    transition-duration: 3s;
}

.box:hover {
    background-color: blue;
}
```

Hovering triggers the change, and the transition makes it smooth.

------------------------------------------------------------------------

# 30. Transition Properties

``` css
transition-property:
transition-duration:
transition-timing-function:
transition-delay:
```

Example:

``` css
.box {
    transition-property: background-color;
    transition-duration: 3s;
    transition-timing-function: ease;
    transition-delay: 1s;
}
```

Multiple properties can be specified:

``` css
transition-property: background-color, transform;
```

or:

``` css
transition-property: all;
```

`all` is convenient, but explicitly listing properties is often clearer
and avoids unintentionally transitioning properties.

------------------------------------------------------------------------

# 31. Transition Shorthand

``` css
transition: background-color 3s ease-in 2s;
```

Instead of:

``` css
transition-property: background-color;
transition-duration: 3s;
transition-timing-function: ease-in;
transition-delay: 2s;
```

You will also commonly see:

``` css
transition: all 3s ease-in 2s;
```

------------------------------------------------------------------------

# 32. Transition vs Animation

### Transition

Normally requires a **trigger or state change**:

``` css
.box:hover {
    transform: scale(1.2);
}
```

### Animation

Can run automatically once applied:

``` css
.box {
    animation: move 3s infinite;
}
```

Mental model:

``` text
Transition:
State A ──trigger──→ State B

Animation:
Keyframes → Keyframes → Keyframes → ...
```

------------------------------------------------------------------------

# 33. CSS Transformations

`transform` changes the visual transformation of an element without
changing normal document flow.

Common transformations:

``` css
transform: scale(2);
transform: translate(50px, 20px);
transform: rotate(30deg);
transform: skewX(30deg);
```

## `scale()`

``` css
transform: scale(2);
```

Makes the element visually twice as large.

Also:

``` css
transform: scaleX(2);
transform: scaleY(2);
```

## `translate()`

``` css
transform: translate(50px, 20px);
```

Moves the element visually by the given X and Y amounts.

Also:

``` css
transform: translateX(50px);
transform: translateY(20px);
```

## `rotate()`

``` css
transform: rotate(30deg);
```

Rotates the element around its transform origin.

3D variants:

``` css
transform: rotateX(30deg);
transform: rotateY(30deg);
transform: rotateZ(30deg);
```

## `skew()`

``` css
transform: skewX(30deg);
transform: skewY(30deg);
```

Skews the element along the selected axis.

------------------------------------------------------------------------

# 34. Transform vs Layout

A useful distinction:

``` text
Normal layout → determines where elements occupy space.
Transform     → changes an element visually without changing normal flow.
```

For example:

``` css
transform: translateX(100px);
```

visually moves the element, but the space it originally occupied remains
part of the layout.

> **Correction:** Transitions do not inherently affect surrounding
> elements. A transition only makes a property change smooth. Whether
> surrounding elements move depends on the property being changed. A
> `transform`, for example, does not change normal layout flow.

------------------------------------------------------------------------

# 35. Perspective and 3D Transforms

`perspective` controls the apparent depth of 3D transformations.

Example:

``` css
.parent {
    perspective: 800px;
}

.child {
    transform: translateZ(200px);
}
```

This can create the illusion that the child is moving toward or away
from the viewer.

Usually `perspective` is applied to the parent and the 3D transform to
the child.

### 3D rotation

``` css
transform: rotateX(30deg);
transform: rotateY(30deg);
transform: rotateZ(30deg);
```

------------------------------------------------------------------------

# 36. `transform-origin`

By default, transformations occur around the element’s center.

Change the origin with:

``` css
transform-origin: top left;
```

or:

``` css
transform-origin: 0 0;
```

This is especially useful for rotations and scaling.

------------------------------------------------------------------------

# 37. Quick Cheat Sheet

## Flexbox

``` css
display: flex;
flex-direction: row;
justify-content: center; /* main axis */
align-items: center;     /* cross axis */
flex-wrap: wrap;
gap: 10px;
```

### Flex item properties

``` css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 100px;
flex: 1;
align-self: flex-start;
order: 2;
```

## Grid

``` css
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: repeat(2, 1fr);
grid-column: 1 / 3;
grid-row: 1 / 3;
```

## Responsive Design

``` css
@media screen and (max-width: 600px) {
    /* narrow-screen styles */
}
```

## Shadows

``` css
box-shadow: 5px 5px 10px 3px black;
box-shadow: inset 5px 5px 10px black;
```

## Overflow

``` css
overflow: hidden;
overflow: auto;
overflow: scroll;
```

## Animation

``` css
@keyframes slide {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(500px);
    }
}

.box {
    animation: slide 3s ease-in-out infinite alternate;
}
```

## Transition

``` css
.box {
    transition: transform 0.3s ease;
}

.box:hover {
    transform: scale(1.1);
}
```

## Transform

``` css
transform: translate(50px, 20px);
transform: scale(2);
transform: rotate(30deg);
transform: skewX(30deg);
transform: rotateX(30deg);
```

------------------------------------------------------------------------

# 38. The Big Picture

``` text
                 CSS Layout & Motion
                         │
          ┌──────────────┴──────────────┐
          │                             │
        Layout                        Motion
          │                             │
    ┌─────┴─────┐               ┌──────┴──────┐
    │           │               │             │
  Flexbox      Grid        Transition      Animation
    │           │               │             │
  1D layout    2D layout      Triggered      Keyframes
                              change          over time
          │
          └──────── Responsive Design
                       │
                  Media Queries
                       │
               Different layouts
                for screen sizes
```

### Final mental model

- **Flexbox** → arrange things mainly in one direction.
- **Grid** → arrange things in rows and columns.
- **Media queries** → change styles based on conditions such as viewport
  width.
- **Box shadow** → add depth/shadow.
- **Overflow** → control content that exceeds a box.
- **Transition** → smoothly move between CSS states.
- **Animation** → define a sequence of changes with keyframes.
- **Transform** → visually move, rotate, scale, or skew an element.
