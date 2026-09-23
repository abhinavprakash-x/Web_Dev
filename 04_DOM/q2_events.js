const handleClick = () => {
    const heading = document.getElementById("heading");
    heading.style.color = "red";
    heading.textContent = "You clicked the heading!";
}

// OR

// const heading = document.getElementById("heading");
// heading.onclick = function handleClick() {
//     heading.style.color = "red";
//     heading.textContent = "You clicked the heading!";
// }

// OR

const heading = document.getElementById("heading");
heading.addEventListener("click", handleClick);