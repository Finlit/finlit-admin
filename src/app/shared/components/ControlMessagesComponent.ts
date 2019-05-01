import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
@Component({
  selector: 'control-messages',
  template: `
    <div class="errorMsg" *ngIf="errorMessage != null">{{errorMessage}}</div>
  `,
  styles: [
    `
      .errorMsg {
        bottom: -18px;
        color: #c40000;
        font-size: 12px;
        left: 0;
        position: absolute;
      }
    `
  ]
})
export class ControlMessagesComponent {
  @Input() controlName: string;
  @Input() control: FormControl;

  constructor() {
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
