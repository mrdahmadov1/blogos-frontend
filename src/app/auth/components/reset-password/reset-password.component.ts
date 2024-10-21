import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
      this.successMessage = null;
    });
  }

  submitForm(): void {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPassword(
          this.resetPasswordForm.value,
          '77c6c1cbc392f15425a92f4f2552dbc706028b26b448d243a8be8bc09d1d139a'
        )
        .subscribe({
          next: (response) => {
            console.log('Password Reset Successful', response);
            this.resetPasswordForm.reset();
            this.errorMessage = null;
            this.successMessage = `Password Reset Successfully! Let's login`;
          },
          error: (error) => {
            console.error('Password Reset failed', error);
            this.errorMessage = error.error.message;
            this.successMessage = null;
          },
          complete: () => {
            console.log('Password reset request completed');
          },
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
