"use strict"
var gMeme
var gTxt = [
    ' I did attack the floor',
    'pushing my luck',
    'I like to be an optimist',
    'It pisses people off',
    'it is legendary',
    'although I regret it',
    'A day without sunshine is like',
    'Laugh a lot',
    'I am currently under construction',
    'I tried to be normal once',
    'all the single ladies',
    'Some days I amaze myself',
    'Life is like an ice cream',
    'Story of my life',
    'keep Calm'
]
var gStartPos
_createMemes()
_createMeme()
setFocusedLine()


function _createMeme(id) {
    if (id === undefined) id = 1
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: createLines(2)
    }
}
function createLines(amount) {
    const lines = []
    for (let i = 0; i < amount; i++) {
        const line = createLine(i)
        if (i === 0) line.isSelected = true
        lines.push(line)
    }
    return lines
}
function createLine(lineId) {
    const line = {
        lineId,
        txt: 'add text',
        size: 20,
        align: 'left',
        color: '#ffffff',
        font: 'Impact',
        stroke: '#000000',
        pos: createPos(lineId),
        isSelected: false,
        isDrag: false
    }

    return line
}
function getMeme() {
    const memeCopy = JSON.parse(JSON.stringify(gMeme))
    return memeCopy
}

function updateFontColor(color) {
    const line = getSelectedLine()
    line.color = color
}
function updateStrokeColor(color) {
    const line = getSelectedLine()
    line.stroke = color
}
function updateLineSize(append) {
    const line = getSelectedLine()
    const { size } = line
    if (size <= 0 && append < 0) return
    if (gCanvas.height - line.pos.y - size < 0 && append > 0) return
    if (gCanvas.width - line.pos.x - gCtx.measureText(line.txt).width < 0 && append > 0) return
    line.size += append
}
function updateFont(font) {
    const line = getSelectedLine()
    line.font = font
}

function updateLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    if (!lines.length || lines === undefined) return
    const line = getSelectedLine()
    line.txt = txt
}
function updateLineFocus() {
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.isSelected)
}
function setFocusedLine() {
    gMeme.lines.forEach((line, index) => {
        if (index === gMeme.selectedLineIdx) {
            line.isSelected = true
        } else { line.isSelected = false }
    })
}

function getSelectedLine() {
    const line = gMeme.lines.find(line => line.isSelected)
    return line
}
function getSelectedLineCopy() {
    const line = getSelectedLine()
    if (!line) return
    return JSON.parse(JSON.stringify(line))
}
function moveLine(dx, dy) {
    const line = getFocusedLine()
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
function updatePosition(pos) {
    const line = getSelectedLine()
    if (pos === 'left') line.pos.x = 40
    if (pos === 'center') line.pos.x = 180
    if (pos === 'right') line.pos.x = 280
    if (pos === 'up') line.pos.y = 50
    if (pos === 'down') line.pos.y = 350

}
function createPos(lineId) {
    let pos = {}
    if (lineId === 0) {
        pos = { x: 180, y: 50 }
    } else if (lineId === 1) {
        pos = { x: 180, y: 350 }
    } else {
        pos = { x: 180, y: 200 }
    }
    return pos
}
function addLine(txt) {
    const { lines, selectedLineIdx } = gMeme
    if (lines.length) txt = 'add text'
    const line = createLine(gMeme.lines.length)
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    setFocusedLine()
    renderMeme()
}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    updateLineFocus()
    renderMeme()
}
function createRandomMeme() {
    gMeme = {
        selectedImgId: getRandomIntInclusive(0, gImgs.length - 1),
        selectedLineIdx: 0,
        lines: createRandomLines(getRandomIntInclusive(1, 2))
    }
}
function createRandomLines(amount) {
    const lines = []
    for (var i = 0; i < amount; i++) {
        const line = createLine(i)
        line.txt = gTxt[getRandomIntInclusive(0, gTxt.length - 1)]
        line.color = getRandomColor()
        line.stroke = getRandomColor()
        lines.push(line)
    }
    return lines
}
function saveMeme() {
    gMemes.push(gMeme)
    saveToStorage(STORAGE_KEY, gMemes)
}
function setLineWidth(idx, width) {
    if (!width) return
    gMeme.lines[idx].width = width
}
function onDown(ev) {
    const pos = getEvPos(ev);
    //finding the line clicked
    const line = gMeme.lines.find(line => isTextClicked(pos, line)
    )
    if (!line) return
    //setting all lines to unselect besides the line
    gMeme.lines.forEach(line => line.isSelected = false)
    //Save the pos we start from
    line.isSelected = true
    line.isDrag = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderMeme()

}
function onMove(ev) {
    const pos = getEvPos(ev)
    const line = gMeme.lines.find(line => line.isDrag)
    if (!line) return
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}
function moveText(dx, dy) {
    let line = getSelectedLine()
    line.pos.x += dx
    line.pos.y += dy
}
function onUp() {
    const line = gMeme.lines.find(line => line.isSelected)
    if (!line) return
    line.isDrag = false
    document.body.style.cursor = 'auto'
}