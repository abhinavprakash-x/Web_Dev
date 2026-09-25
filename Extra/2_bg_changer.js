const parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
    parent.style.backgroundColor = event.target.id;
});