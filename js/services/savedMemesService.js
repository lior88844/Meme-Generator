"use strict"
var gMemes
var STORAGE_KEY = 'memeDB'
_createMemes()

function getMemes() {
    return JSON.parse(JSON.stringify(gMemes))
}
function _createMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    // Nothing in storage - generate demo data
    if (!memes) {
        memes = [];
    }
    gMemes = memes;
    _saveMemesToStorage();
}
function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMemes);
}