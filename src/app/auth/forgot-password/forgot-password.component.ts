import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (response) => {
          console.log('Forgot Password Request Successful', response);
          // Handle forgot password request success, e.g., inform the user to check their email
        },
        error: (error) => {
          console.error('Forgot Password Request failed', error);
        },
        complete: () => {
          console.log('Forgot password request completed');
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
