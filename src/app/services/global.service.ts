import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const CONTENT_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  TEXT: 'text',
  CODEBLOCK: 'codeblock',
};

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public routeSubject = new BehaviorSubject<string>(
    localStorage.getItem('route') || 'home'
  );

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
