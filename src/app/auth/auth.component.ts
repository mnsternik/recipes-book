import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) { }

  @ViewChild('f') authForm: NgForm;

  isLoginMode = false;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (!this.isLoginMode) {
      authObs = this.authService.signup(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }
    authObs.subscribe(
      responseData => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    this.authForm.reset();
  }
}

//consider making seperate component for login and for singing up

