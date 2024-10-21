import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css'],
})
export class AddPostModalComponent {
  isVisible = false;
  addPostForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  @Output() postAdded = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addPostForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    this.addPostForm.valueChanges.subscribe(() => {
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
    this.addPostForm.reset();
  }

  handleAddPost(): void {
    this.addPostForm.markAllAsTouched();

    if (this.addPostForm.valid) {
      const newPost = {
        ...this.addPostForm.value,
        createdAt: new Date().toISOString(),
      };
      this.postAdded.emit(newPost);
      this.isVisible = false;
      this.addPostForm.reset();
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
