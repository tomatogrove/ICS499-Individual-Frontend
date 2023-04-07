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
    public matchTo: AbstractControl;
    
    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value !== this.matchTo.value) {
            return {invalidInput: true};
        }
        return null;
    }
    
}
