import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPassword(
          this.resetPasswordForm.value,
          '7bea7e6e975fe33ec0bcfd5da45956b9277e87290d9487e1bce3922ab3cc6555'
        )
        .subscribe({
          next: (response) => {
            console.log('Password Reset Successful', response);
            // Handle successful password reset, e.g., redirect to login
          },
          error: (error) => {
            console.error('Password Reset failed', error);
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
