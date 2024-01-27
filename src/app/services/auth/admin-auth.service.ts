import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class AdminAuthService {

  constructor() { }

  public login(){
    console.log("Start login process? (Y/n)");
  }
}
