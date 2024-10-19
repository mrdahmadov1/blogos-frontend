import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  isVisible = false; // Visibility of the modal
  addUserForm!: FormGroup; // Form group for adding new user

  @Output() userAdded = new EventEmitter<any>(); // Event emitter to notify the parent component

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    // Initialize Add User form
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }

  // Handle the visibility of the modal
  show(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addUserForm.reset();
  }

  handleAddUser(): void {
    // Mark all controls as touched to trigger validation error messages
    this.addUserForm.markAllAsTouched();

    if (this.addUserForm.valid) {
      const newUser = { ...this.addUserForm.value, id: `${Date.now()}` }; // Unique ID based on timestamp
      this.userAdded.emit(newUser); // Emit the new user to the parent component
      this.isVisible = false; // Close the modal after adding user
      this.addUserForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
