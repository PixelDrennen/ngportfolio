import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  routeUrl: string = '';

  constructor(private globalService: GlobalService) {
    globalService.routeSubject.subscribe((a) => {
      this.routeUrl = a;
    });
  }

  navigate(url: string) {
    this.globalService.setRoute(url);
  }
}
