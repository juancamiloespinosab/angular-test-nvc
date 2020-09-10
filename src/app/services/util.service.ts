import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  body: any;

  constructor() {
    this.body = document.getElementsByTagName('body')[0];
  }

  replaceSpaces(words) {
    return words.replace(' ', '+');
  }

  replaceSlash(text) {
    return text.replace('/', '');
  }

  activeGeneralScroll() {
    this.body.classList.remove('body-disabled-scroll');
  }

  deactivateGeneralScroll() {
    this.body.classList.add('body-disabled-scroll');
  }
}
