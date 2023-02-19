"use strict"
var gCanvas
var gCtx
var gImg
var gRect
var gClickedLine
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function setCanvas() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
}

function renderMeme() {
    const meme = getMeme()
    gImg = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = gImg.url
    img.onload = () => {
        // setCanvasSize(img)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        createTextPos()
        drawText()
        drawFocusRect()
        renderToolbox()
    }
}

function setCanvasHeight(img) {
    gCanvas.width = window.innerWidth
    // gCtx.canvas.height = (img.height * gCanvas.width) / img.width
}

function drawImgFromLocal(url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawText() {
    const { lines } = getMeme()
    lines.forEach((line, index) => {
        const { txt, size, color, pos, font, stroke } = line
        gCtx.beginPath()
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
        setLineWidth(index, gCtx.measureText(txt).width)
    })
}

function getCanvasSize() {
    const canvasSize = {
        height: gCanvas.height,
        width: gCanvas.width
    }
    return canvasSize
}

function drawFocusRect() {
    const line = getSelectedLineCopy()
    if (!line) return
    const { pos, size, width } = line
    gCtx.strokeStyle = '#ffffff'
    gCtx.strokeRect(pos.x - 10, pos.y - 10, width + 20, size + 20)
}

function onTextInput(txt) {
    updateLineTxt(txt)
    renderMeme()
}

function onFontColor(color) {
    updateFontColor(color)
    renderMeme()
}

function onStrokeColor(color) {
    updateStrokeColor(color)
    renderMeme()
}

function onSizeInput(append) {
    updateLineSize(append)
    renderMeme()
}

function onSwitchLines() {
    updateLineFocus()
    renderMeme()
}

function renderToolbox() {
    const selectedLine = getSelectedLine()
    if (!selectedLine) return
    document.querySelector(".text-color").value = selectedLine.color
    document.querySelector(".stroke-color").value = selectedLine.stroke
    document.querySelector(".fonts").value = selectedLine.font
    document.querySelector(".text-box").value = selectedLine.txt
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

function onFontChange(font) {
    updateFont(font)
    renderMeme()
}

function onPositionLine(position) {
    updatePosition(position)
    renderMeme()
}

function onTextAlign(align) {
    updatePosition(align)
    renderMeme()
}

function onSave() {
    saveMeme()
}

function onShare() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function onDownload(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64
    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function setLineDrag(isDrag) {
    console.log(isDrag);
    if (!gClickedLine) return
    console.log(gClickedLine);
    gClickedLine.isDrag = isDrag
    console.log(gClickedLine);
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isTextClicked(clickedPos, line) {
    // !DOES NOT WORK ON MOBILE
    const { pos, size, width } = line
    console.log(pos, size, width, clickedPos);
    //adding 10 and substracting 10 to cover the focus square 
    return (pos.x - 10 < clickedPos.x && clickedPos.x < pos.x + width + 10 && pos.y - 10 < clickedPos.y && clickedPos.y < pos.y + size + 10)

}

function onSticker(sticker) {
    addSticker(sticker)
    renderMeme()
}

function getLineWidth(txt) {
    const width = gCtx.measureText(txt).width
    return width
}