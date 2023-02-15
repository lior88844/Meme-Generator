"use strict"


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' }
    ]
}
function getMeme() {
    const memeCopy = JSON.parse(JSON.stringify(gMeme))
    return memeCopy
}



function setLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = txt
}
function setImg(id) {
    gMeme.selectedImgId = id
}