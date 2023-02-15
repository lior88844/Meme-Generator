"ue strict"

function init() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')

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
