let gFocusRect


function createFocusRect(line) {
    const linePos = line.pos
    if (!linePos) return
    console.log(linePos);
    gFocusRect = {
        pos: linePos,
        size: 10,
        color: 'blue',
        isDrag: false
    }
}

function getFocusRect() {
    if (!gFocusRect) return
    return gFocusRect
}

//Check if the click is inside the circle 
function isDragBtnClicked(clickedPos) {
    const { pos } = gFocusRect
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance <= gFocusRect.size
}


function setDragBtn(isDrag) {
    gFocusRect.isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos


