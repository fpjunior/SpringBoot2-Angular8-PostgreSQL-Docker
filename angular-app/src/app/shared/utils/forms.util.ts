import { FormGroup, Validators, FormControl } from '@angular/forms';

export const addValidation = (form: FormGroup, controlValue: string[]): boolean => {
  const workForm = form.controls;
  const value = controlValue;
  value.forEach(e => {
    workForm[e].setValidators(Validators.required);
    workForm[e].updateValueAndValidity();
  })
  return true
}

export const removeValidation = (form: FormGroup, controlValue: string[]): boolean => {
  const workForm = form.controls;
  const value = controlValue;
  value.forEach(e => {
    workForm[e].clearValidators();
    workForm[e].updateValueAndValidity();
  })
  return false;
}


export const disableForm = (form: FormGroup, controlValue: string[]): void => {
  const workForm = form.controls;
  const value = controlValue;
  value.forEach(e => { workForm[e].disable(); })
}

export function forceVerificationFormField(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.forceVerificationFormField(control);
    }
  });
}

