import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class passwordValidators {
  static passwoedstrength(): ValidatorFn {
    return (contorl: AbstractControl): ValidationErrors | null => {
      const value = contorl.value;
      if (!value) {
        return null;
      }
        const hasNumber = /[0-9]/.test(value);
        const hasCapitalLetter = /[A-Z]/.test(value);
        const hasSmallLetter = /[a-z]/.test(value);
        const isValidLength = value.length > 7
        const passwordValid = hasNumber && hasCapitalLetter && hasSmallLetter &&
          isValidLength;
        return passwordValid ? null : { passwordstrength: true };

    };
  }
}
