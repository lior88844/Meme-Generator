"use strict"

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: 'hello', size: 20, align: 'start', color: 'white', pos: { x: 100, y: 50 } }, { txt: 'I love it', size: 20, align: 'start', color: 'white', pos: { x: 100, y: 150 } }
    ]
}
function getMeme() {
    const memeCopy = JSON.parse(JSON.stringify(gMeme))
    return memeCopy
}

function setLineColor(color) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].color = color
}

function setLineSize(append) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].size
    if (lines[selectedLineIdx].size <= 0 && append === -1) lines[selectedLineIdx].size = 0
    lines[selectedLineIdx].size += append
}
function setLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = txt
}
function setLineFocus() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1
    else gMeme.selectedLineIdx = 0
}
function setImg(id) {
    gMeme.selectedImgId = id
}