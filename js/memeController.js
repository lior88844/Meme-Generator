"use strict"
var gCanvas
var gCtx

function init() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderMeme()
}
function renderMeme() {
    drawImgFromLocal()
    //draw text after the image was loaded(setTimeout)
    setTimeout(() => drawText(), 100)
}
function drawText() {
    const color = "white"
    const stroke = "black"
    const text = "hello"
    const size = 50
    const font = 'ariel'
    gCtx.lineWidth = 1
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ariel`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 100, 50) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, 100, 50) // Draws (strokes) a given text at the given (x, y) position.

}
function drawImgFromLocal() {
    const img = new Image()
    img.src = '/img/square/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

