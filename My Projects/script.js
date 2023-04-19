document.getElementById("link1").addEventListener("click", function () {
    showProjectPreview("Project 1", "Mini image of Project 1", "project1-thumbnail.jpg");
});

document.getElementById("link2").addEventListener("click", function () {
    showProjectPreview("Project 2", "Mini image of Project 2", "project2-thumbnail.jpg");
});

document.getElementById("link3").addEventListener("click", function () {
    showProjectPreview("Project 3", "Mini image of Project 3", "project3-thumbnail.jpg");
});

function showProjectPreview(text, alt, src) {
    document.getElementById("preview-text").textContent = text;
    document.getElementById("preview-img").alt = alt;
    document.getElementById("preview-img").src = src;
    document.querySelector(".textbox").style.display = "block";
    document.querySelector("img").style.display = "block";
}
