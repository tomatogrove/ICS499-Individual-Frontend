import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[noDuplicateInput]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DuplicateInputValidatorDirective,
            multi: true
        }
    ]
})
export class DuplicateInputValidatorDirective implements Validator {
    
    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value == null) {
            return {duplicateInput: true};
        }
        return null;
    }
    
}
