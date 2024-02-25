import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateWindowService {
  constructor() {}

  private showWindow: boolean = false;

  private rowId?: string;
  private order?: number;
  getRowId() {
    return this.rowId;
  }
  getOrder(){
    return this.order;
  }
  getShowWindow() {
    return this.showWindow;
  }

  resultEmitter?:EventEmitter<string> = new EventEmitter<string>();

  startCreator(rowId?: string, order?: number) {
    this.showWindow = true;
    this.rowId = rowId;
    this.order = order;

    console.log(
      `Starting create window..\nrow: ${this.rowId} \norder: ${this.order}`,
    );
  }

  closeCreator(){
    this.showWindow = false;
  }
}
