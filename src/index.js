import './styles.scss';
import listCountry from "./templates/list-countrys.hbs";
import cardCountTempl from "./templates/card-countrys.hbs";
import '@pnotify/core/dist/BrightTheme.css';
import { info, Stack } from '@pnotify/core';
import fetchCountries from './js/fetchCountries';
// ----------------------------
const PNotify = require('@pnotify/core');
const debounce = require('lodash.debounce');
// ----------------------------
const refs = {
    inputTextElem: document.querySelector(".input-js"),
    resultBoxElem: document.querySelector(".result-box"),
    listItemCountElem: document.querySelector(".list-item"),
    cardCountElem: document.querySelector(".card-section"),
}
// ----------------------------
refs.inputTextElem.addEventListener('input', debounce(getCountName,500));
function getCountName() {
    let charNameCountr = refs.inputTextElem.value;
    fetchCountries(charNameCountr).then((arr) => {
        const {status} = arr;
        if (arr.length ===1) {
           return renderCartCount(arr);
        }
        else if (arr.length > 10) {
           return notificationListCount();
        }
        else if (status === 404) {
            return messageNoFaund();
        }
        renderListCount(arr);
    }).catch(error=>{console.log(error);});
}
function renderListCount(arr) {
    const names = arr.map(({ name }) => name);
    refs.resultBoxElem.innerHTML = listCountry({ names });
}
function renderCartCount(arr) {
    const [{ name, flag, population, capital, languages }] = arr;
    refs.resultBoxElem.innerHTML = cardCountTempl({ name, flag, population, capital, languages });
}
function notificationListCount() {
    refs.resultBoxElem.innerHTML = '';
    info({
      sticker: false,
        delay: '1000',
        maxOpen: 1,
        maxTextHeight: null,
        closer: false,
        closerHover: true,
        title: false,
        text: 'Too many matches found. Please enter a more specific query!',
        stack: new Stack({
            modal: true,
            context: document.body,
       })
    })
}
function messageNoFaund() {
        refs.resultBoxElem.innerHTML = '';
    info({
      sticker: false,
        delay: '1000',
        maxOpen: 1,
        maxTextHeight: null,
        closer: false,
        closerHover: true,
        title: false,
        text: 'Country with such name doesn\'t exist!',
        stack: new Stack({
            dir1: 'down',
            // dir2: 'right',
            modal: true,
            context: document.body,
       })
    })

}