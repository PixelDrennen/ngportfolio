import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/auth/user-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
})
export class AppComponent {
  title = 'Drennen Dooms';

  constructor(router: Router, private userAuth: UserAuthService) {
    // router.navigate(['work']);
  }
}
