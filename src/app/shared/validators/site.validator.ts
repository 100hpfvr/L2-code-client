import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const urlRegex =
    /^(?:https?:\/\/)?([\w.-]+\.[a-zA-Z]{2,})(:\d{1,5})?(\/[^?\s]*)?(?:\?([^#\s]*))?(?:#(\S*))?$/;
export function urlValitador(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value && !urlRegex.test(control.value)
            ? { validUrl: false }
            : null;
    };
}
