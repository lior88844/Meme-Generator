"use strict"
var gImgs = [{ id: 1, url: 'img/square/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'img/square/2.jpg', keywords: ['funny', 'cat'] }, { id: 3, url: 'img/square/3.jpg', keywords: ['funny', 'cat'] }, { id: 4, url: 'img/square/4.jpg', keywords: ['funny', 'cat'] }, { id: 5, url: 'img/square/5.jpg', keywords: ['funny', 'cat'] }, { id: 6, url: 'img/square/6.jpg', keywords: ['funny', 'cat'] }, { id: 7, url: 'img/square/7.jpg', keywords: ['funny', 'cat'] }, { id: 8, url: 'img/square/8.jpg', keywords: ['funny', 'cat'] }, { id: 9, url: 'img/square/9.jpg', keywords: ['funny', 'cat'] }, { id: 10, url: 'img/square/10.jpg', keywords: ['funny', 'cat'] }, { id: 11, url: 'img/square/11.jpg', keywords: ['funny', 'cat'] }, { id: 12, url: 'img/square/12.jpg', keywords: ['funny', 'cat'] }, { id: 13, url: 'img/square/13.jpg', keywords: ['funny', 'cat'] }, { id: 14, url: 'img/square/14.jpg', keywords: ['funny', 'cat'] }, { id: 15, url: 'img/square/15.jpg', keywords: ['funny', 'cat'] }, { id: 16, url: 'img/square/16.jpg', keywords: ['funny', 'cat'] },];

function getImgs() {
    const imgsCopy = JSON.parse(JSON.stringify(gImgs))
    return imgsCopy
}
function getImgById(id) {
    const img = gImgs.find(img => img.id === id)
    const imgCopy = JSON.parse(JSON.stringify(img))
    return imgCopy
}