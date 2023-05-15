import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      name: new FormControl('', [Validators.required]),
    }),
    3: new FormGroup({
      country: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
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
    if(this.currentStep <= 1) return;
    this.currentStep--;
  }

  public formInvalid() {
    return (this.stepsFormGroup[this.currentStep].status == "INVALID")
  }

}
