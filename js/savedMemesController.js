"use strict"

function renderSavedMemes() {
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    let strHtml = ''
    const memes = getMemes()
    memes.forEach(meme => {
        renderMeme()

    });
    elSavedMemesContainer.innerHTML = strHtml
}