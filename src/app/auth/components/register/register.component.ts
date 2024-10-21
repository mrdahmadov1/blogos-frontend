import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
      this.successMessage = null;
    });
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // console.log('Registration Successful', response);
          this.registerForm.reset();
          this.errorMessage = null;
          this.successMessage = `Successfully! Let's login`;
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = error.error.message;
          this.successMessage = null;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
