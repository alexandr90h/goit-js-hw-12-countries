import './styles.scss';
import listCountry from "./templates/list-countrys.hbs";
const refs = {
    inputTextElem: document.querySelector(".input-js"),
    resultBoxElem: document.querySelector(".result-box"),
   
}
// let COUNTRYS_NAME=inpu
refs.inputTextElem.addEventListener('input', getCountName);
function getCountName() {
    let charNameCountr = refs.inputTextElem.value;
    if (charNameCountr.length < 2)
    {return console.log('error'); }
    fetch(`https://restcountries.eu/rest/v2/name/${charNameCountr}`).then(response => {
        return response.json();
    }).then((arr) => {
        // const listItemElem=document.querySelector('.list-item');
        // refs.resultBoxElem.removeChild(listItemElem);
        renderListCount(arr);
    }).catch(error=>console.log(error));
}
function renderListCount(arr) {
    // refs.resultBoxElem.removeChild(refs.listItemElem);
    const listItemElem = document.querySelector('.list-item');
    //  console.log(listItemElem);
    if (listItemElem != null) { listItemElem.remove(); console.log('del');}
            const names = arr.map(({ name }) => name);
    refs.resultBoxElem.insertAdjacentHTML("beforeend", arr.map(listCountry).join(''));
    
    console.log(arr);
    // console.log(arr.map(listCountry).join(''));
}