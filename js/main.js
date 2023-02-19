"ue strict"

function init() {
    setCanvas()
    navToSection()
    renderGallery()
    renderMeme()
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

    })
}

function loadContent() {
    if (!location.hash) {
        displayContent('#gallery')
        return
    }
    displayContent(location.hash)
}

function displayContent(content) {
    content = content.slice(1)
    const sections = document.querySelectorAll(`.page`)
    sections.forEach(section => {
        if (section.className.includes(content)) section.classList.add('active')
        else section.classList.remove('active')
    })
}

function hideSavedMemes() {
    document.querySelector('.saved-memes').classList.remove('active')
}

function displaySavedMemes() {
    document.querySelector('.saved-memes').classList.add('active')
}

function hideMeme() {
    document.querySelector('.edit').classList.remove('active')
}

function displayMeme() {
    document.querySelector('.edit').classList.add('active')
}

function hideGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove("active")

}

function displayGallery() {
    document.querySelector('.gallery').classList.add('active')
}

function displayAbout() {
    document.querySelector('.about').classList.add('active')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

