import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateFields } from 'src/app/shared/validators/fields.validator';

/**
 * placeholder: string;
 * controlName: string;
 * mask: string;
 * label: string;
 * formGroup: FormGroup;
 * unmask?: boolean;
 * required?: boolean;
 * disabled?: boolean;
 */
@Component({
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.scss']
})
export class InputMaskComponent {

  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() mask: string;
  @Input() label: string;
  @Input() formGroup: FormGroup;
  @Input() unmask?: boolean = true;
  @Input() required?: boolean = false;
  @Input() disabled?: boolean = false;
  @Output() blur = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() input = new EventEmitter();

  constructor(public validator: ValidateFields) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
