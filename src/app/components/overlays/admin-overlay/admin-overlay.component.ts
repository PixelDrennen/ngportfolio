import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-overlay',
  standalone: false,
  templateUrl: './admin-overlay.component.html',
  styleUrl: './admin-overlay.component.scss',
  moduleId: module.id,
})
export class AdminOverlayComponent {


  constructor(public userAuth:UserAuthService, public global:GlobalService){
    this.global.isEditing = (localStorage.getItem('isEditing') == 'true');
  }

  toggleEdit(){
    this.global.isEditing = !this.global.isEditing;
    localStorage.setItem('isEditing', this.global.isEditing.toString());
  }

}
