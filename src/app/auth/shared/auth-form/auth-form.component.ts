import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  animations: [
    trigger('helpMotion', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('0.5s ease-in', style({ opacity: 1 }))]),
      transition('* => void', [
        animate('0.5s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AuthFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() title!: string;
  @Input() fields!: Array<{
    type: string;
    formControlName: string;
    placeholder: string;
    errorTip: string;
  }>;
  @Input() buttonText!: string;
  @Input() redirectForgot!: string;
  @Input() redirectLink!: string;
  @Input() redirectText!: string;
  @Output() submitForm = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit();
      console.log('Form Submitted', this.formGroup.value);
    } else {
      for (const i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
  }
}
