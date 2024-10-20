import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  isVisible = false;
  addUserForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  @Output() userAdded = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });

    this.addUserForm.valueChanges.subscribe(() => {
      this.errorMessage = null; // Reset error message on value change
      this.successMessage = null; // Reset success message on value change
    });
  }

  show(): void {
    this.isVisible = true;
    this.errorMessage = null;
    this.successMessage = null;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addUserForm.reset();
  }

  handleAddUser(): void {
    this.addUserForm.markAllAsTouched();

    if (this.addUserForm.valid) {
      const newUser = { ...this.addUserForm.value, id: `${Date.now()}` };
      this.userAdded.emit(newUser);
      this.isVisible = false;
      this.addUserForm.reset();
    }
  }

  // New methods to set messages from parent component
  setSuccessMessage(message: string): void {
    this.successMessage = message;
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}
