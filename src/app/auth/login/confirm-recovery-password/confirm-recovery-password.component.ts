import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'confirm-recovery-password',
  templateUrl: './confirm-recovery-password.component.html',
  styleUrls: ['./confirm-recovery-password.component.scss'],
})
export class ConfirmRecoveryPasswordComponent implements OnInit {

  public password: string;
  public loading = {};
  public sellerId: string;
  public code: string;

  public formGroup: FormGroup = new FormGroup({
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

  constructor(
    private route: Router, private platform: Platform,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.sellerId = params.get('sellerId');
      this.code = params.get('code');
      if(!this.sellerId || !this.code) {
        this.alertService.showToastAlert("Não foi possível obter as informações do usuario.");
        //this.route.navigateByUrl('/auth');
        return;
      }

    })
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
    //this.navCtrl.back();
    this.route.navigateByUrl('/auth');
  }

  public confirmRecoveryPassword() {
    this.loading['password'] = true;
    const newPassword = this.formGroup.get('newPassword').value;

    this.accountService.confirmRecoveryPassword(this.sellerId, this.code, newPassword).subscribe((response) => {
      this.loading['password'] = false;
      if(response.success) {
        this.alertService.showToastAlert("Senha alterada com sucesso.");
        this.route.navigateByUrl('/auth');
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
