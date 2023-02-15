"use strict"

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    elGallery.style.display = 'block'
    hideMeme()
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
    elMeme.style.display = "none"
}