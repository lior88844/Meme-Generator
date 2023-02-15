"use strict"
var gImgs = [{ id: 1, url: 'img/square/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'img/square/2.jpg', keywords: ['funny', 'cat'] }];

function getImgs() {
    const imgsCopy = JSON.parse(JSON.stringify(gImgs))
    return imgsCopy
}
function getImgById(id) {
    const img = gImgs.find(img => img.id === id)
    const imgCopy = JSON.parse(JSON.stringify(img))
    return imgCopy
}