import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export enum CONTENT_TYPES {
  IMAGE= 'image',
  VIDEO= 'video',
  TEXT= 'text',
  CODEBLOCK= 'codeblock',
  MODEL='model',
  GALLERY='gallery',
  CAROUSEL='carousel',
  EMBED='embed',
  HYPERLINK='hyperlink',
  AUDIO='audio',
  BUTTON='button',
  SPACER='spacer',
  DOWNLOAD='download',
};

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public routeSubject = new BehaviorSubject<string>(
    localStorage.getItem('route') || 'home'
  );

  public isEditing:boolean = true;

  constructor(private router: Router) {
    // this.routeSubject.subscribe(route => {
    //   router.navigate([route]);
    // });
  }

  public setRoute(route: string) {
    this.routeSubject.next(route);
    localStorage.setItem('route', route);
  }
}
