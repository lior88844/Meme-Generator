"use strict"
var gCanvas
var gCtx
var gImg

function setCanvas() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    addListeners()
}
function renderMeme() {
    hideGallery()
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.add('active')
    renderCanvas()
}
function renderCanvas() {
    const meme = getMeme()
    gImg = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = gImg.url
    img.onload = () => {
        // setCanvasSize(img)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        setTextPos()
        drawText()
        drawLineFocus()
    }
}
function setCanvasHeight(img) {
    gCanvas.width = window.innerWidth
    // gCtx.canvas.height = (img.height * gCanvas.width) / img.width
}
function drawText() {
    const { lines } = getMeme()
    lines.forEach(line => {
        const { txt, size, color, align, pos } = line
        const stroke = "black"
        const font = 'impact'
        // gCtx.beginPath()
        gCtx.lineWidth = 1
        gCtx.strokeStyle = stroke
        gCtx.fillStyle = color
        gCtx.font = `${size}px ${font}`
        //can't be changed!
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
function onAddLine() {
    const txt = document.querySelector('.text-box').value
    addLine(txt)
    renderMeme()
}
function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function hideGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove("active")

}
