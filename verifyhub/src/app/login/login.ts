import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  loginForm;

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm =
      this.formBuilder.group({

        userId: [
          '',
          Validators.required
        ],

        password: [
          '',
          Validators.required
        ],

        role: [
          'General User',
          Validators.required
        ]

      });

  }

  onLogin(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    const {
      userId,
      password,
      role
    } = this.loginForm.value;

    this.authService.login(
      userId!,
      password!,
      role!
    ).subscribe({

      next: (response) => {

        this.authService.saveUser(
          response.user
        );

        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: (error) => {

        this.errorMessage =
          error.error?.message ||
          'Login failed. Please try again.';

      }

    });

  }

}