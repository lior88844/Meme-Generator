"use strict";
var gStartPos
var gRectPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        init()
    })
}
function drawLineFocus() {
    const { lines, selectedLineIdx } = getMeme()
    const selectedLine = lines[selectedLineIdx]
    if (!selectedLine) return
    let { pos, txt, size } = selectedLine
    let { x, y } = pos
    let rectPos = { x: x - 10, y: y - 10 }
    gCtx.rect(rectPos.x, rectPos.y, gCtx.measureText(txt).width + 20, size + 20)
    gCtx.strokeStyle = 'white'
    gCtx.stroke();
    createDragBtn(rectPos)
    drawDragBtn()
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

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isDragBtnClicked(pos)) return
    setDragBtn(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getDragBtn()
    if (!isDrag) return
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    setTextPos()
    drawText()
    drawLineFocus()
    addListeners()

}

function onUp() {
    // console.log('Up')
    setDragBtn(false)
    document.body.style.cursor = 'auto'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
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
function drawDragBtn() {
    const { pos, color, size } = getDragBtn()
    //Draw the circle
    drawArc(pos.x, pos.y, size, color)
}

function drawArc(x, y, size, color) {
    gCtx.beginPath()
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = color
    gCtx.stroke()
    gCtx.fillStyle = 'white'
    gCtx.fill()
    drawCross(x, y, color)
}

function drawCross(x, y, color) {
    gCtx.beginPath()
    gCtx.moveTo(x, y + 8)
    gCtx.lineTo(x, y - 8)
    gCtx.moveTo(x - 8, y)
    gCtx.lineTo(x + 8, y)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = color
    gCtx.stroke()
}


