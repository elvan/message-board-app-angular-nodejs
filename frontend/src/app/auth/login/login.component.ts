import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
          localStorage.setItem(
            'message-board-user',
            JSON.stringify({
              id: response.id,
              email: response.email,
              token: response.token,
            })
          );
          this.router.navigateByUrl('/');
        },
        (errorResponse) => {
          this.isLoading = false;
          this.snackBar.open(errorResponse.error.message, 'OK', {
            duration: 3000,
          });
        }
      );
  }
}
