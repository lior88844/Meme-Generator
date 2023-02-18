"ue strict"

function init() {
    setCanvas()
    navToSection()
    loadContent()
    addListeners()
}
function navToSection() {
    window.addEventListener("hashchange", function () {
        loadContent()
    });
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        init()
    })
}

function loadContent() {
    switch (location.hash) {
        case "#about":
            renderGallery()
            break
        case "#edit":
            hideGallery()
            hideSavedMemes()
            renderMeme()
            displayMeme()
            break
        case "#gallery":
            hideMeme()
            hideSavedMemes()
            renderGallery()
            displayGallery()
            break
        case '#memes':
            hideGallery()
            hideMeme()
            // renderSavedMemes()
            displaySavedMemes()
        default:
            hideMeme()
            hideSavedMemes()
            renderGallery()
            displayGallery()
    }
}
function hideSavedMemes() {
    document.querySelector('.saved-memes').classList.remove('active')
}
function displaySavedMemes() {
    document.querySelector('.saved-memes').classList.add('active')
}
function hideMeme() {
    document.querySelector('.meme-container').classList.remove('active')
}
function displayMeme() {
    document.querySelector('.meme-container').classList.add('active')
}
function hideGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove("active")

}
function displayGallery() {
    document.querySelector('.gallery').classList.add('active')
}
function toggleMenu() {
    document.body.classList.toggle('menu-open');
}