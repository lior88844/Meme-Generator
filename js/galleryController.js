"use strict"

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    let htmlStr = ``
    const imgs = getImgs()
    imgs.map(({ id, url }) => {
        htmlStr += `<div class="img-card">
        <img class='img' src=${url} data-id='${id}' onclick="onImgSelect(this.dataset.id)"/>
    </div>`
    })
    elGallery.innerHTML = htmlStr
    renderKeywordSearch()
}

function onImgSelect(id) {
    _createMeme(+id)
    renderMeme()
    window.location.hash = '#edit';
}

function renderRandomMeme() {
    createRandomMeme()
    renderMeme()
    window.location.hash = '#edit';
}

function onFilterImg(txt) {
    console.log(txt);
    var filterBy = setImgFilter(txt);
    renderGallery();
    setQueryParams(filterBy);
}

function renderKeywordSearch() {
    const elContainer = document.querySelector('.keywords-search')
    let strHtml = ''
    const keywordCounter = getKeywordCounter()
    for (let keyword in keywordCounter) {
        strHtml += `<button value="${keyword}"onclick="onFilterImg(this.value)" style="font-size:${10 + (keywordCounter[keyword] * 3)}px;">${keyword}</button>`
    }
    elContainer.innerHTML = strHtml
}

function toggleKeywords() {
    document.querySelector(".keywords-search").classList.toggle('expand');
}
