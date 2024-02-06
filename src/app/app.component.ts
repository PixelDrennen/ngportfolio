import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/auth/user-auth.service';
import { Location } from '@angular/common';
import { GlobalService } from './services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
})
export class AppComponent implements OnInit {
  title = 'Drennen Dooms';

  constructor(
    private router: Router,
    private userAuth: UserAuthService,
    private globalService: GlobalService,
    private location: Location,
  ) {
    // router.navigate(['work']);
  }
  ngOnInit(): void {
    console.log(`path: ${this.location.path()}`);

    if (this.location.path().replaceAll('/', '') == 'logout') {
      this.userAuth.logout();
      this.globalService.setRoute('home');
    }

    if (
      (this.location.path() === '/' ||
        this.location.path() == '' ||
        this.location.path() == undefined) &&
      (this.globalService.routeSubject.getValue() == undefined ||
        this.globalService.routeSubject.getValue() == '')
    ) {
      console.log('routing', this.globalService.routeSubject.getValue());
      this.globalService.setRoute('home');
    } else {
      if (this.location.path() == '') {
        this.globalService.setRoute('home');
      } else {
        console.log(`routing to ${this.location.path()}`);
        this.globalService.setRoute(this.location.path().replaceAll('/', ''));
      }
    }

    this.globalService.routeSubject.subscribe((route) => {
      this.router.navigate([route]);
      console.log('from', this.router.url, 'to', route);
    });

    // _route.queryParams.subscribe((params) => {console.log(`route params\n${params}`)});
  }
}
