import './styles.css';
import fetchCountries from './fetchCountries';
import {debounce} from 'lodash';
import countryBuildHtml from './template/country.hbs';
import countryBuildList from './template/country-list.hbs';
//import PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
const { error ,notice } = require('@pnotify/core');

const choiseInput = document.querySelector('input');
choiseInput.addEventListener('input', _.debounce(writeCountry, 700));
const choiseCountry = document.querySelector('#section-country');
const choiseUlList = document.querySelector('#country-list');

function writeCountry(event) {
  clearInput();
  if (!event.target.value) {
    return;
  }
  fetchCountries(event.target.value, buildResult);
}

function buildResult(array) {
  if (array.length > 10) {
    error({
      title: 'Oh No!',
      text: 'Too many matches found.Please enter a more specific query.',
    });
  } else if (array.length >= 2 && array.length <= 10) {
    const markUpList = array.map(name => countryBuildList(name)).join('');
    choiseUlList.insertAdjacentHTML('beforeend', markUpList);
  } else if (array.length === 1) {
    const markUp = countryBuildHtml(array);
    choiseCountry.insertAdjacentHTML('beforeend', markUp);
  } else{
    notice({
      title: 'WARNING!!!',
      text: 'ENTER CORRECT COUNTRY'
    });
  }
}

function clearInput() {
  choiseUlList.innerHTML = '';
  choiseCountry.innerHTML = '';
}