const func1 = function handleMouseOver(event) {
    event.target.style.height = "200px";
    event.target.style.width = "200px";
}

const func2 = function handleMouseOut(event) {
    event.target.style.height = "100px";
    event.target.style.width = "100px";
}

const boxes = document.getElementById("container");
for(let child of boxes.children) {
    child.addEventListener("mouseover", func1);
    child.addEventListener("mouseout", func2);
}