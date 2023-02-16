let gDragBtn

function createDragBtn(pos) {
    gDragBtn = {
        pos,
        size: 10,
        color: 'blue',
        isDrag: false
    }
}

function getDragBtn() {
    if (!gDragBtn) return
    return gDragBtn
}

//Check if the click is inside the circle 
function isDragBtnClicked(clickedPos) {
    const { pos } = gDragBtn
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside

    return distance <= gDragBtn.size
}


function setDragBtn(isDrag) {
    gDragBtn.isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos


