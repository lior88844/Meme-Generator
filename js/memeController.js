"use strict"
var gCanvas
var gCtx


function renderMeme() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    hideGallery()
    const elMeme = document.querySelector('.meme-container')
    elMeme.style.display = "block"
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    drawImgFromLocal(img.url)
    console.log(img);
    //draw text after the image was loaded(setTimeout)
    setTimeout(() => drawText(meme), 100)
}
function drawText({ lines, selectedLineIdx }) {
    const line = lines[selectedLineIdx]
    console.log(line);
    const { txt, size, align, color } = line
    const stroke = "black"
    const font = 'impact'
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, 100, 50) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, 100, 50) // Draws (strokes) a given text at the given (x, y) position.

}
function drawImgFromLocal(url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}
function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function hideGallery() {
    const elGallery = document.querySelector('.gallery-container')
    elGallery.style.display = "none"
}