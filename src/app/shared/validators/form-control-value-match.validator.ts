import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function formControlValueMatchValidator(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return !!control.parent &&
            !!control.parent.value &&
            control.value === control.parent.get(matchTo)?.value
            ? null
            : { matching: false };
    };
}
