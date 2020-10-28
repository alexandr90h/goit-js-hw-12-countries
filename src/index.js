import './styles.css';
console.log('dbbhr');
fetch('https://restcountries.eu/rest/v2/name/uk').then(response => { return response.json(); }).then(({name}) =>{console.log(name);} ).catch()