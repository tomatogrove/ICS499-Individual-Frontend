import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[matchInput]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MatchInputValidatorDirective,
            multi: true
        }
    ]
})
export class MatchInputValidatorDirective implements Validator {
    @Input()
    public matchInput: AbstractControl;

    constructor() {}
    
    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && this.matchInput.value && control.value !== this.matchInput.value) {
            return {invalidInput: true};
        }
        return null;
    }
    
}
