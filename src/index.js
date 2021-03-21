import './styles.css';
import fetchCountries from './fetchCountries';
import {debounce} from 'lodash';
import countryBuildHtml from './template/country.hbs';
import countryBuildList from './template/country-list.hbs';
import PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const choiseInput = document.querySelector('input');
choiseInput.addEventListener('input', _.debounce(writeCountry, 700));
const choiseCountry = document.querySelector('#section-country');
const choiseUlList = document.querySelector('#country-list');

function writeCountry(event) {
  clearInput();
  PNotify.closeAll();
  if (!event.target.value) {
    return;
  }
  fetchCountries(event.target.value, buildResult);
}

function buildResult(array) {
  if (array.length > 10) {
    PNotify.error({
      title: 'Oh No!',
      text: 'Something terrible happened.',
    });
  } else if (array.length >= 2 && array.length <= 10) {
    const markUpList = array.map(name => countryBuildList(name)).join('');
    choiseUlList.insertAdjacentHTML('beforeend', markUpList);
  } else if (array.length === 1) {
    const markUp = countryBuildHtml(array);
    choiseCountry.insertAdjacentHTML('beforeend', markUp);
  } else{
    PNotify.notice({
      title: 'WARNING!!!',
      text: 'ENTER CORRECT COUNTRY'
    });
  }
}

function clearInput() {
  choiseUlList.innerHTML = '';
  choiseCountry.innerHTML = '';
}