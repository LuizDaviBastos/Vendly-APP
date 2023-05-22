import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/services/account-service';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'password-tab-settings',
  templateUrl: 'password-settings.page.html',
  styleUrls: ['password-settings.page.scss']
})
export class PasswordSettingsPage implements OnInit {

  public password: string;
  public loading = {};

  public formGroup: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public get touched(): boolean {
    return this.formGroup.touched;
  }

  public get errors(): any {
    return {
      'minLength': this.lengthGreaterOrEqual8(this.formGroup.get('newPassword').value),
      'number': this.containsNumber(this.formGroup.get('newPassword').value),
      'special': this.containsSpecialCharacter(this.formGroup.get('newPassword').value),
      'matching': this.matchPassword()
    }
  }

  constructor(private route: Router, private platform: Platform,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService) { }
  ngOnInit(): void {

  }

  public formInvalid() {
    return (this.formGroup.status == "INVALID")
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
    let password = this.formGroup.get('newPassword').value;
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


  public goBack() {
    this.navCtrl.back();
  }

  public changePassword() {
    this.loading['password'] = true;
    const sellerId = LocalStorage.getLogin().data.id;
    const password = this.formGroup.get('oldPassword').value;
    const newPassword = this.formGroup.get('newPassword').value;

    this.accountService.changePassword(sellerId, password, newPassword).subscribe((response) => {
      this.loading['password'] = false;
      if(response.success) {
        this.alertService.showToastAlert("Senha alterada com sucesso.");
        this.navCtrl.back();
      } else {
          this.alertService .showToastAlert("Houve um erro tentar alterar sua senha.")
      }
    }, (err) => {
      this.loading['password'] = false;
      this.alertService.errorAlert(err);
    }, () => {
      this.loading['password'] = false;
    })

  }
}
