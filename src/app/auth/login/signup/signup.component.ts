import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public currentStep: 1 | 2 | 3 | 4 = 3;
  public stepsFormGroup = {
    1: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
    2: new FormGroup({
      country: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }),
    3: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }),
    4: new FormGroup({
      country: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    })
  }

  constructor() { }


  ngOnInit() { }

  public nextStep() {
    if (this.currentStep >= 4) return;
    this.currentStep++;
  }

  public previousStep() {
    if (this.currentStep <= 1) return;
    this.currentStep--;
  }

  public formInvalid() {
    return (this.stepsFormGroup[this.currentStep].status == "INVALID")
  }

}

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value ? null : { matching: true };
  };
}