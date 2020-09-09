import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  replaceSpaces(words) {
    return words.replace(' ', '+');
  }

  replaceSlash(text) {
    return text.replace('/', '');
  }
}
