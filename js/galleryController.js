"use strict"

function renderGallery() {
    hideMeme()

    const elGallery = document.querySelector('.gallery-container')
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
    _createMeme(+id)
    renderMeme()
    window.location.hash = '#edit';
}

function renderRandomMeme() {
    createRandomMeme()
    renderMeme()
    window.location.hash = '#edit';
}