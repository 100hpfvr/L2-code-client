import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isCnpjValid } from '../helpers/cnpj';

export function cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value && !isCnpjValid(control.value)
            ? { cnpjInvalid: control.value }
            : null;
    };
}
