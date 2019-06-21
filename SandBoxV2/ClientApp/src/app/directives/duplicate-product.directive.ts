import { Directive, Input } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}
