import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.getProfile();
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      passwordCurrent: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  getProfile(): void {
    this.profileService.getMe().subscribe({
      next: ({ data: { name, email } }) => {
        this.profileForm.patchValue({ name, email });
      },
      error: ({ error }) => {
        this.errorMessage = error.message;
        this.successMessage = null;
      },
    });
  }

  onUpdateMe(): void {
    if (this.profileForm.invalid) return;

    this.profileService.updateMe(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile details updated successfully!';
        this.errorMessage = null;
      },
      error: ({ error }) => {
        this.errorMessage = error.message;
        this.successMessage = null;
        this.getProfile();
      },
    });

    this.errorMessage = null;
    this.successMessage = null;
  }

  onUpdatePassword(): void {
    if (this.passwordForm.invalid) return;

    this.profileService.updateMyPassword(this.passwordForm.value).subscribe({
      next: () => {
        this.successMessage =
          'Password changed successfully, let`s login again!';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/auth/login']), 2500);
      },
      error: ({ error }) => {
        this.errorMessage = error.message;
        this.successMessage = null;
      },
    });

    this.passwordForm.reset();
    this.errorMessage = null;
    this.successMessage = null;
  }

  onDeleteMe(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete your account?',
      nzContent: 'This action cannot be undone!',
      nzOnOk: () => {
        this.profileService.deleteMe().subscribe({
          next: () => {
            this.successMessage = 'Account deleted successfully!';
            this.errorMessage = null;
            setTimeout(() => this.router.navigate(['/auth/login']), 2500);
          },
          error: ({ error }) => {
            this.errorMessage = error.message;
            this.successMessage = null;
          },
        });
      },
    });

    this.errorMessage = null;
    this.successMessage = null;
  }
}
