import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { IncidentService } from "../services/incident.service";
import { DomainService } from "../services/domain.service";


export class CustomValidators {

    static numbersOnly(): ValidatorFn {
        let regExp: RegExp = /^[0-9]*$/;

        return (control: AbstractControl): {[key: string]: any} | null => {                     
            const numbersOnly = regExp.test(control.value);

            return !numbersOnly ? { 'numbersOnly': {value: control.value} } : null;
        };
    }

    static domainNotExists(domainService: DomainService): AsyncValidatorFn {       
        return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
          if (control.value == '') {
            return null;
          }
          else {
            return domainService.getByName(control.value).then(response => {
                    return !response ? { 'domainNotExists': { value: control.value } } : null;
                })
          }                  
        };
    }
    /*
    static domainNotExists(domainService: DomainService): AsyncValidatorFn {     
    var output = this.domainNotExists2(domainService);
    console.log("DomainNotExists: ", output);
    return output;
    }
    */
}