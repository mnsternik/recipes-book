import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild('f') authForm: NgForm;

  isLoginMode: boolean; 
  isLoading = false;
  error: string = null;

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isLoginMode = url[0].path === 'login'; 
    })
  }

  onSwitchMode() {
    if (this.isLoginMode) {
      this.router.navigate(['register']);
    } else {
      this.router.navigate(['login']);
    }
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

