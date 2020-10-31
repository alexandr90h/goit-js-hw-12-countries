import './styles.scss';
import listCountry from "./templates/list-countrys.hbs";
import cardCountTempl from "./templates/card-countrys.hbs";
import '@pnotify/core/dist/BrightTheme.css';
import {alert, Stack} from '@pnotify/core';
const refs = {
    inputTextElem: document.querySelector(".input-js"),
    resultBoxElem: document.querySelector(".result-box"),
    listItemCountElem: document.querySelector(".list-item"),
    cardCountElem: document.querySelector(".card-section"),
}

const PNotify = require('@pnotify/core');
const debounce = require('lodash.debounce');
const {defaults} = require('@pnotify/core');
defaults.sticker= false;
defaults.delay = '1000';
defaults.maxTextHeight = null;
defaults.stack = new Stack({
    dir1: 'up',
    firstpos1: 100,
    maxOpen: 1,
    context: refs.resultBoxElem,
});
refs.inputTextElem.addEventListener('input', debounce(getCountName(),500));
function getCountName() {
    let tempArr = [];
    let charNameCountr = refs.inputTextElem.value;
    fetch(`https://restcountries.eu/rest/v2/name/${charNameCountr}`).then(response => {
        return response.json();
    }).then((arr) => {
        tempArr = arr;
        if (arr.length === 1) {
            return renderCartCount(arr);
        }
        else if (arr.length > 10 || tempArr!=arr) {
            return notificationListCount();
        }
        renderListCount(arr);
    }).catch(error=>console.log(error));
}
function renderListCount(arr) {
    const names = arr.map(({ name }) => name);
    refs.resultBoxElem.innerHTML = listCountry({ names });
}
function renderCartCount(arr) {
    const [{ name, flag, population, capital, languages }] = arr;
refs.resultBoxElem.innerHTML = cardCountTempl({name,flag, population, capital, languages});
}
function notificationListCount() {
    if (refs.listItemCountElem != null) {
        refs.resultBoxElem.removeChild(refs.listItemCountElem);
    }
    else if (refs.cardCountElem != null) {
        console.log(refs.cardCountElem);
        refs.resultBoxElem.removeChild(refs.cardCountElem);
    }
    alert('Too many matches found. Please enter a more specific query!');
}