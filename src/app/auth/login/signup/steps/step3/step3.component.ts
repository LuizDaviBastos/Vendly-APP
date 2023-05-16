import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['../../signup.component.scss', './step3.component.scss'],
})
export class Step3Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;

  constructor(private cdr: ChangeDetectorRef) { }

  public get touched(): boolean {
    return this.formGroup.touched;
  }

  public get errors(): any {
    return {
      'minLength': this.lengthGreaterOrEqual8(this.formGroup.get('password').value),
      'number': this.containsNumber(this.formGroup.get('password').value),
      'special': this.containsSpecialCharacter(this.formGroup.get('password').value)
    }
  }

  ngOnInit() { }

  public hasErrorMatching() {
    return this.formGroup.hasError('matching');
  }

  public changeDetected() {
    let password = this.formGroup.get('password').value;
    let confirmPassword = this.formGroup.get('confirmPassword').value;

    if (password != confirmPassword) {
      this.formGroup.setErrors({
        matching: true,
      });
    }
    if (password.length > 8) {

    } else {
      this.formGroup.setErrors(null);
    }
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

}


