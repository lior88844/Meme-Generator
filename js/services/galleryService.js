"use strict"
var gImgs = [
    { id: 1, url: 'img/square/1.jpg', keywords: ['funny', 'president', 'man', 'trump', 'angry', 'china'] },
    { id: 2, url: 'img/square/2.jpg', keywords: ['funny', 'dog', 'kissing', 'love'] },
    { id: 3, url: 'img/square/3.jpg', keywords: ['funny', 'dog', 'baby', 'cuddling', 'love', 'sleep'] },
    { id: 4, url: 'img/square/4.jpg', keywords: ['funny', 'cat', 'sleep', 'tired'] },
    { id: 5, url: 'img/square/5.jpg', keywords: ['funny', 'baby', 'victory', 'happy'] },
    { id: 6, url: 'img/square/6.jpg', keywords: ['funny', 'man', 'explaining', 'history'] },
    { id: 7, url: 'img/square/7.jpg', keywords: ['funny', 'baby', 'suprise', 'eyes'] },
    { id: 8, url: 'img/various/8.jpg', keywords: ['funny', 'man', 'hat', 'curious'] },
    { id: 9, url: 'img/square/9.jpg', keywords: ['funny', 'baby', 'evil', 'hands'] },
    { id: 10, url: 'img/square/10.jpg', keywords: ['funny', 'president', 'laughing', 'smile'] },
    { id: 11, url: 'img/square/11.jpg', keywords: ['funny', 'man', 'kiss', 'love'] },
    { id: 12, url: 'img/square/12.jpg', keywords: ['funny', 'man', 'fingers'] },
    { id: 13, url: 'img/square/13.jpg', keywords: ['serious', 'man', 'glass', 'cheers'] },
    { id: 14, url: 'img/square/14.jpg', keywords: ['funny', 'man', 'glasses', 'matrix'] },
    { id: 15, url: 'img/square/15.jpg', keywords: ['funny', 'man', 'explaining', 'game of thrones'] },
    { id: 16, url: 'img/square/16.jpg', keywords: ['funny', 'man', 'hands'] },];
var gFilterBy = { keyword: '' }
var gFilters = []
var gKeywordCounter
createKeywordCounter()
function getImgs() {
    const imgs = getFilteredImgs()
    const imgsCopy = JSON.parse(JSON.stringify(imgs))
    return imgsCopy
}
createKeywordCounter()
function getFilteredImgs() {
    const filteredImg = gImgs.filter(img => {
        return img.keywords.join('').includes(gFilterBy.keyword)
    })
    return filteredImg
}

function getImgById(id) {
    const img = gImgs.find(img => img.id === id)
    const imgCopy = JSON.parse(JSON.stringify(img))
    return imgCopy
}

function setImgFilter(filterBy) {
    if (filterBy === undefined) {
        gFilterBy.keyword = ''
        return
    } gFilterBy.keyword = filterBy
    return gFilterBy
}
function createKeywordCounter() {
    const keywords = []
    gImgs.forEach(img => {
        keywords.push(...img.keywords)
    })
    gKeywordCounter = keywords.reduce((acc, keyword) => {
        acc[keyword] = (acc[keyword] + 1) || 1
        return acc
    }, {})

}
function getKeywordCounter() {
    return JSON.parse(JSON.stringify(gKeywordCounter))
}