let click = document.getElementById("click");

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#F5FF33", "#FF33A1", "#A133FF", "#33FFA1", "#FFA133"];

click.addEventListener("click", function(e) {
    let circle = document.createElement("div");
    circle.classList.add("circle");

    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    circle.style.left = e.clientX - 25 + "px";
    circle.style.top = e.clientY - 25 + "px";

    document.body.appendChild(circle);

    setTimeout(function() {
        circle.remove();
    }, 1000);
});