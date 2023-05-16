import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['../../signup.component.scss', './step4.component.scss'],
})
export class Step4Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;
  @Input('email') email: string;

  constructor(private cdr: ChangeDetectorRef) { }

  public get touched(): boolean {
    return this.formGroup.touched;
  }

  public get errors(): any {
    return {
      'minLength': this.lengthGreaterOrEqual8(this.formGroup.get('password').value),
      'number': this.containsNumber(this.formGroup.get('password').value),
      'special': this.containsSpecialCharacter(this.formGroup.get('password').value),
      'matching': this.matchPassword()
    }
  }

  ngOnInit() { }

  public hasErrorMatching() {
    const state = this.formGroup.hasError('matching');
    return state;
  }

  changeDetected() {
    this.changeState('matching');
    this.changeState('special');
    this.changeState('number');
  }

  public containsNumber(str: string) {
    return /\d/.test(str);
  }

  public containsSpecialCharacter(str: string) {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
  }

  public lengthGreaterOrEqual8(str: string) {
    return str.length >= 8
  }
  
  public matchPassword() {
    let password = this.formGroup.get('password').value;
    let confirmPassword = this.formGroup.get('confirmPassword').value;
    return (password == confirmPassword);
  }

  public changeState(name: string) {
    if(!this.formGroup.errors) {
      this.formGroup.setErrors({});
    }

    if (!this.errors[name]) {
      this.formGroup.errors[name] = true;
    } else {
      delete this.formGroup.errors[name];
    }

    if(Object.keys(this.formGroup.errors).length == 0) {
      this.formGroup.setErrors(null);
    }
  }

}


