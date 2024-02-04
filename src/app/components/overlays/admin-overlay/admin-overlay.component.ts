import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-admin-overlay',
  standalone: false,
  templateUrl: './admin-overlay.component.html',
  styleUrl: './admin-overlay.component.scss',
  moduleId: module.id,
})
export class AdminOverlayComponent {


  constructor(public userAuth:UserAuthService){}

}
