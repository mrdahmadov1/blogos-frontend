import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login Successful', response);

          localStorage.setItem('jwt', response.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.errorMessage = null;

          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = error.error.message;
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
