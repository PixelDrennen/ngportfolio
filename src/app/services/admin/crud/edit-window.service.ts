import { Injectable } from '@angular/core';
import { ContentBlock } from '../../firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class EditWindowService {

  constructor() { }

  showWindow:boolean = false;

  rowId?:string;
  order?:number;

  selectedContent?:ContentBlock;
}
