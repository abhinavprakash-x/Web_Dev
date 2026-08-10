Flexbox is used to make divs automatically position themselves without manual height/width calculation.
Must have parent-child relation for flexbox to work
parent = container
child = item

display: flex; <--- parent, this makes it's children inline-block
flex-direction: row/column/row-reverse/column-reverse; how to arrange children
justify-content: center; align all divs in centre of parent div. other values: start/end/space-around/etc. on main axis

flex-direction   row             col
main axis   horizontal      vertical
cross axis  vertical        horizontal

align-items work on cross axis
flex-wrap: wrap; <--- makes divs wrap around the screen (if someone opens it on phone and it doesn't fit it will go on next line)
gap: 5px; <--- 5px gap b/w divs (used in parent, doesn't need margin)

children properties-->
flex-grow: 1 --> fills the screen width with selected item if space is empty (1 = divide empty part in 1 portion and give it to this item)
flex-shrink: 4 --> shrinks the current item if screen width less. (higher value higher shrink speed compared to other items)
flex-basis: 100px --> increase length across main axis
align-self: flex-start; current item gets out of parent alignment and goes to top (or wherever specified) of flex

Flexbox is 1 dimensional layout (works around one axis)


Grids: 2D Flexbox: 1D
Parent container: Grid rows columns
Child items: Grid-items

parent --> display: grid;
           grid-template-rows: 200px 200px;
           grid-template-columns: 200px 200px;
items can "overflow" out of grid to prevent it use grid-template-rows/coluns to be 1fr (fraction)

NOTE: grid-template-rows: repeat(10, 1fr); will make 10 equal divisions

How to make items consume more space/divisions?
in child item--> grid-column-start: 1
                 grid-column-end: 4
                 grid-row-start/end too; shorthand property grid-row: 2/4; grid-column: 1/3;

Media Queries and Responsive Websites

What are Responsive Websites:
Websites that work on all devices properly (phone screen low width long height vs laptop high width low height)
use media queries to achieve this

<--Default CSS-->
@media screen and (max-width or min-width: 600px) {<--CSS for Phone-->}

Desktop First Approach vs Mobile First Approach for Websites. In real world Mobile first approach
is more common (due to amount of users on phone obviously)

box-shadow: xOffset yOffset color; --> Self Explanatory
box-shadow: xOffset yOffset blurRadius color; --> Blurs the shadow
box-shadow: xOffset yOffset blurRadius spreadRadius color; --> adds a border(spread) around the shadow
box-shadow: inset; --> without inset box forms a shadow, with inset box is pressed into the shadow
inset moves the shadow inside the element

overflow: hidden; hides the extra stuff out of a div
overflow: scroll; scroll overflow content inside the div