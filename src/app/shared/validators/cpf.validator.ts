import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isCpfValid } from '../helpers/cpf';

export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value && !isCpfValid(control.value)
            ? { cpfInvalid: control.value }
            : null;
    };
}
