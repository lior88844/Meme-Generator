"use strict"

function renderGallery() {
    hideMeme()
    const elGallery = document.querySelector('.gallery-container')
    elGallery.classList.add('active')
    let htmlStr = ''
    const imgs = getImgs()
    imgs.map(({ id, url }) => {
        htmlStr += `<div class="img-card">
        <img class='img' src=${url} data-id='${id}' onclick="onImgSelect(this.dataset.id)"/>
    </div>`
    })
    elGallery.innerHTML = htmlStr
}
function onImgSelect(id) {
    setImg(+id)
    renderMeme()
}

function hideMeme() {
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.remove('active')
}