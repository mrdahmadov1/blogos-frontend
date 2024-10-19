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
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.forgotPasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
      this.successMessage = null;
    });
  }

  submitForm(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (response) => {
          console.log('Forgot Password Request Successful', response);
          this.forgotPasswordForm.reset();
          this.errorMessage = null;
          this.successMessage = `Reset link sent Successfully, Check your Email!`;
        },
        error: (error) => {
          console.error('Forgot Password Request failed', error);
          this.errorMessage = error.error.message;
          this.successMessage = null;
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
