import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, OnInit {
  isLoading = false;

  loginSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginSub = this.authService
      .login({
        email: loginForm.value.email,
        password: loginForm.value.password,
      })
      .subscribe(
        (response) => {
          this.isLoading = false;
          console.log(response);
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }
}
