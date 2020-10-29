import './styles.scss';
import listCountry from "./templates/list-countrys.hbs";
import cardCountTempl from "./templates/card-countrys.hbs";
const refs = {
    inputTextElem: document.querySelector(".input-js"),
    resultBoxElem: document.querySelector(".result-box"),
    listItemCountElem: document.querySelector(".list-item"),
}
refs.inputTextElem.addEventListener('input', getCountName);
function getCountName() {
    let charNameCountr = refs.inputTextElem.value;
    if (charNameCountr.length < 2)
    { return clearListBox(); }
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
    console.log('renderCartCount');
const [{ name, flag, population, capital}] = arr;
refs.resultBoxElem.innerHTML = cardCountTempl({name,flag, population,capital});
}
function clearListBox() {
    refs.resultBoxElem.removeChild(refs.listItemCountElem)
}