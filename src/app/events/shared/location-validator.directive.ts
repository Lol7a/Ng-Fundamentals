import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true },
  ],
})
export class LocationValidator implements Validator {
  constructor() {
    console.log('Hi!');
  }

  // METHOD FOR VALIDATING LOCATION
  validate(formGroup: FormGroup): { [key: string]: any } {
    // DECLARING ~ DEFINING PROPERTIES WITH FORMGROUPS
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    // IF LOCATION OR ONLINE URL OT BOTH ARE VALID
    // THEN THE FORM IS VALIDATED
    if (
      (addressControl &&
        addressControl.value &&
        cityControl &&
        cityControl.value &&
        countryControl &&
        countryControl.value) ||
      (onlineUrlControl && onlineUrlControl.value)
    ) {
      return null!;
    } else {
      return { validateLocation: false };
    }
  }
}
