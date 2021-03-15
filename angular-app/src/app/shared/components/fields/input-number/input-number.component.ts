import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateFields } from 'src/app/shared/validators/fields.validator';

/**
 * placeholder: string;
 * controlName: string;
 * label: string;
 * formGroup: FormGroup;
 * min?: number;
 * max?: number;
 * minFractionDigits?: number;
 * maxFractionDigits?: number;
 * required?: boolean;
 * disabled?: boolean;
 */
@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() formGroup: FormGroup;
  @Input() min?: number;
  @Input() max?: number;
  @Input() maxlength?: number;
  @Input() minFractionDigits?= 0;
  @Input() maxFractionDigits?= 2;
  @Input() required?: boolean = false;
  @Input() disabled?: boolean = false;
  @Output() blur = new EventEmitter();
  @Output() key = new EventEmitter();

  constructor(public validator: ValidateFields) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
