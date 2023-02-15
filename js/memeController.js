"use strict"
var gCanvas
var gCtx


function renderMeme() {
    hideGallery()
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.add('active')
    const meme = getMeme()
    const memeImg = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = memeImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(meme)
        drawLineFocus(meme)
    }
}
function drawText({ lines }) {
    lines.forEach(line => {
        const { txt, size, color, pos } = line
        const stroke = "black"
        const font = 'impact'
        gCtx.beginPath()
        gCtx.lineWidth = 1
        gCtx.strokeStyle = stroke
        gCtx.fillStyle = color
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = 'start'
        gCtx.textBaseline = 'top'
        const { x, y } = pos
        gCtx.fillText(txt, x, y)
        gCtx.strokeText(txt, x, y)
    })
}

function drawImgFromLocal(url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(meme)
        drawLineFocus(meme)
    }
}
function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}
function onColorInput(color) {
    setLineColor(color)
    renderMeme()
}
function onSizeInput(append) {
    setLineSize(append)
    renderMeme()
}
function onSwitchLines() {
    setLineFocus()
    renderMeme()
}
function drawLineFocus({ lines, selectedLineIdx }) {
    //drawing the rec around the current Line
    const selectedLine = lines[selectedLineIdx]
    const { pos, txt, size } = selectedLine
    gCtx.beginPath()
    gCtx.rect(pos.x - 10, pos.y - 10, gCtx.measureText(txt).width + 20, size + 20)
    gCtx.strokeStyle = 'white'
    gCtx.stroke();
    //adding a dragging btn
    gCtx.beginPath()
    gCtx.arc(pos.x - 10, pos.y - 10, 10, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.fillStyle = 'white'
    gCtx.fill()
}
function hideGallery() {
    const elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove("active")

}