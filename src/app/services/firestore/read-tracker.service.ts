import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadTrackerService {

  reads:number = 0;
  constructor() { 
    this.getReads();
  }

  getReads(){
    let _reads = localStorage.getItem('reads');
    if(_reads){
      this.reads = parseInt(_reads);
    }
  }

  saveRead(){
    this.getReads();
    this.reads++;
    localStorage.setItem('reads', this.reads.toString());
    console.log(`Reads just increased! ${this.reads}`);
  }
}
