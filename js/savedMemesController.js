"use strict"

function renderSavedMemes() {
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    let strHtml = ''
    const memes = getMemes()
    //rendering canvases
    memes.forEach((meme, index) => {
        console.log(index);
        strHtml += `<canvas class="canvas${index}"></canvas>`
    });
    elSavedMemesContainer.innerHTML = strHtml
    //rendering meme inside canvases
    memes.forEach((meme, index) => {
        gCanvas = document.querySelector(`.canvas${index}`)
        gCtx = gCanvas.getContext('2d')
        gImg = getImgById(meme.selectedImgId)
        const img = new Image()
        img.src = gImg.url
        img.onload = () => {
            // setCanvasSize(img)
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
            drawText()
            drawFocusRect()
            renderToolbox()
        }
    }
    )
}