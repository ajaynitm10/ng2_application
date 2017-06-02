import { Directive } from '@angular/core'
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
    //without multi parameter, LocationValidator overrides the NG_VALIDATORS list of validators.
    // Bcz of multi parameter, LocationValidator will be added to NG_VALIDATORS list of Validators
})

export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): {[key:string]: any } {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let counrtyControl = formGroup.controls['country'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((addressControl && addressControl.value && cityControl && 
        cityControl.value && counrtyControl && counrtyControl.value && onlineUrlControl && onlineUrlControl.value)
         || (onlineUrlControl && onlineUrlControl.value)){
             return null;
         } else {
             return {validateLocation: false}
         }
    }
}