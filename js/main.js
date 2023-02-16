"ue strict"
function init() {
    setCanvas()
    navToSection()
    loadContent()
}
function navToSection() {
    window.addEventListener("hashchange", function () {
        loadContent()
    });
}
function loadContent() {
    switch (location.hash) {
        case "#about":
            renderGallery()
            break
        case "#meme":
            renderMeme()
            break
        case "#gallery":
            renderGallery()
            break
        default:
            renderGallery()
    }
}
