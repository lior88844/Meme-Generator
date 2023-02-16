"use strict"

function renderGallery() {
    hideMeme()
    const elGallery = document.querySelector('.gallery-container')
    document.querySelector('.gallery').classList.add('active')
    let htmlStr = ``
    const imgs = getImgs()
    imgs.map(({ id, url }) => {
        htmlStr += `<div class="img-card">
        <img class='img' src=${url} data-id='${id}' onclick="onImgSelect(this.dataset.id)"/>
    </div>`
    })
    elGallery.innerHTML = htmlStr
}
function onImgSelect(id) {
    createMeme(+id)
    renderMeme()
    window.location.hash = '#meme';
}
function hideMeme() {
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.remove('active')
}
function renderRandomMeme() {
    createRandomMeme()
    renderMeme()
    window.location.hash = '#meme';
}