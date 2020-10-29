import './styles.scss';
import listCountry from "./templates/list-countrys.hbs";
import cardCountTempl from "./templates/card-countrys.hbs";
import '@pnotify/core/dist/BrightTheme.css';
// import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
const PNotify = require('@pnotify/core');
const debounce = require('lodash.debounce');
const {defaults} = require('@pnotify/core');
// defaults.styling = 'material';
defaults.sticker= false;
// defaults.mode = 'light';
defaults.delay = '1000';
// defaults.stack = {dir1: 'down',
//   dir2: 'left',
//   firstpos1: 25,
//   firstpos2: 25,
//   spacing1: 36,
//   spacing2: 36,
//   push: 'bottom',
//   context: document.querySelector('result-box')};
//     mode: 'light',
//     maxTextHeight: null,
//     sticker: false,
//     delay: 1000

const refs = {
    inputTextElem: document.querySelector(".input-js"),
    resultBoxElem: document.querySelector(".result-box"),
    listItemCountElem: document.querySelector(".list-item"),
}
refs.inputTextElem.addEventListener('input', debounce(getCountName,500));
function getCountName() {
    let charNameCountr = refs.inputTextElem.value;
    if (charNameCountr.length < 2)
    { return PNotify.alert('Too many matches found. Please enter a more specific query!')}
    fetch(`https://restcountries.eu/rest/v2/name/${charNameCountr}`).then(response => {
        return response.json();
    }).then((arr) => {
        if (arr.length === 1) {
            return renderCartCount(arr);
        }
        renderListCount(arr);
    }).catch(error=>console.log(error));
}
function renderListCount(arr) {
    const names = arr.map(({ name }) => name);
    refs.resultBoxElem.innerHTML = listCountry({ names });
}
function renderCartCount(arr) {
const [{ name, flag, population, capital}] = arr;
refs.resultBoxElem.innerHTML = cardCountTempl({name,flag, population,capital});
}
function clearListBox() {
    refs.resultBoxElem.removeChild(refs.listItemCountElem)
}