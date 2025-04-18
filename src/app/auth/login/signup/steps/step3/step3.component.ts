import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Settings } from 'src/models/settings.model';
import { AuthService } from 'src/services/auth-service';
import { SettingsService } from 'src/services/settings-service';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['../../signup.component.scss', './step3.component.scss'],
})
export class Step3Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;
  public settings: Settings = new Settings();
  constructor(private cdr: ChangeDetectorRef, private settingsService: SettingsService) { }

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

  ngOnInit() {
    this.settingsService.loadSettings().subscribe((settings) => {
      this.settings = settings;
    })
  }

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
    if (!this.formGroup.errors) {
      this.formGroup.setErrors({});
    }

    if (!this.errors[name]) {
      this.formGroup.errors[name] = true;
    } else {
      delete this.formGroup.errors[name];
    }

    if (Object.keys(this.formGroup.errors).length == 0) {
      this.formGroup.setErrors(null);
    }
  }

}


