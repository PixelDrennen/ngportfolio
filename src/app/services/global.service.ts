import { Injectable } from '@angular/core';

export const CONTENT_TYPES = {
  IMAGE:'image',
  VIDEO:'video',
  TEXT:'text',
  CODEBLOCK:'codeblock'
};


@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor() { }
}
