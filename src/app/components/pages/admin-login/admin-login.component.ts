import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  constructor(private authService:UserAuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.nullValidator]),
  });

  login() {
    // console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    if (this.loginForm.valid) {
      console.log('Valid form');
      if (this.loginForm.controls.email.value != null && this.loginForm.controls.password.value != null) {
        this.authService.SignInWithEmailPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
      }
    }
  }
}
