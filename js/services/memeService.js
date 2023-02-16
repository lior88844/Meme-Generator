"use strict"
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        lineId: 0,
        txt: 'add text',
        size: 20,
        align: 'left',
        color: 'white'
    }, {
        lineId: 1,
        txt: 'add text',
        size: 20,
        align: 'left',
        color: 'white'
    }
    ]
}
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
function createMeme(id) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [{
            lineId: 0,
            txt: 'add text',
            size: 20,
            align: 'left',
            color: 'white'
        }, {
            lineId: 1,
            txt: 'add text',
            size: 20,
            align: 'left',
            color: 'white'
        }
        ]
    }
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
    const line = lines[selectedLineIdx]
    const { size } = line
    if (size <= 0 && append < 0) return
    if (gCanvas.height - line.pos.y - size < 0 && append > 0) return
    if (gCanvas.width - line.pos.x - gCtx.measureText(line.txt).width < 0 && append > 0) return
    lines[selectedLineIdx].size += append
}
function setLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    if (!lines.length || lines === undefined) return
    lines[selectedLineIdx].txt = txt
}
function setLineFocus() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
    console.log(gMeme.selectedLineIdx);
}
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
function setTextPos() {
    gMeme.lines.forEach(line => {
        if (line.pos === undefined) {
            if (line.lineId === 0) {
                line.pos = { x: 100, y: line.size + 10 }
            } else if (line.lineId === 1) {
                line.pos = { x: 100, y: 350 }
            } else {
                line.pos = { x: 100, y: line.lineId * 40 }
            }

        }
        const { pos, txt, size } = line
        let { x, y } = pos
        if (x < 0) x = 0
        if (x >= gCanvas.width - gCtx.measureText(txt).width) x = gCanvas.width - gCtx.measureText(txt).width
        if (y <= 0) y = 0
        if (y >= gCanvas.height - size) y = gCanvas.height - size
        // }
    }
    )
}
function addLine(txt) {
    const { lines, selectedLineIdx } = gMeme
    if (lines.length) txt = 'add text'
    const line =
    {
        lineId: gMeme.lines.length,
        txt,
        size: 20,
        align: 'left',
        color: 'white'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = (gMeme.lines.length - 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}
function createRandomMeme() {
    gMeme = {
        selectedImgId: getRandomIntInclusive(0, gImgs.length - 1),
        selectedLineIdx: 0,
        lines: createLines(getRandomIntInclusive(1, 2))
    }
}
function createLines(amount) {
    const lines = []
    for (var i = 0; i < amount; i++) {
        const line = {
            lineId: i,
            txt: gTxt[getRandomIntInclusive(0, gTxt.length - 1)],
            size: 20,
            align: 'left',
            color: getRandomColor
        }
        lines.push(line)
    }
    return lines
}