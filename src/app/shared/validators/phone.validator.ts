import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regExp = /^\d{10,11}$/;

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value && !regExp.test(control.value)
            ? { validPhone: false }
            : null;
    };
}
