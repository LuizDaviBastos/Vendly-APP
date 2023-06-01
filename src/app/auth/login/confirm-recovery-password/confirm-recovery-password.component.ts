import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  // public formGroup: FormGroup = new FormGroup({
  //   newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  // });

  public _reload = true;

  public reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }


  public newPassword: string = '';
  public confirmPassword: string = '';

  public get touched(): boolean {
    return this.newPassword != ''; //this.formGroup.touched;
  }

  public get errors(): any {
    return {
      'minLength': this.lengthGreaterOrEqual8(this.newPassword),
      'number': this.containsNumber(this.newPassword),
      'special': this.containsSpecialCharacter(this.newPassword),
      'matching': this.matchPassword()
    }
  }

  constructor(
    private route: Router, private platform: Platform,
    private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.sellerId = params.get('sellerId');
      this.code = params.get('code');
      return;
      if (!this.sellerId || !this.code) {
        this.alertService.showToastAlert("Não foi possível obter as informações do usuario.");
        this.route.navigateByUrl('/auth');
        return;
      }

    })
  }

  public formInvalid() {
    return !this.newPassword || !this.confirmPassword || this.confirmPassword?.length < 8 || this.newPassword?.length < 8 || !this.matchPassword();
  }

  public changeDetected() {
    this.reload();
    this.change.detectChanges();
    //this.changeState('matching');
    //this.changeState('special');
    //this.changeState('number');
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
    let password = this.newPassword;
    let confirmPassword = this.confirmPassword;
    return (password == confirmPassword);
  }

  // public changeState(name: string) {
  //   if (!this.formGroup.errors) {
  //     this.formGroup.setErrors({});
  //   }

  //   if (!this.errors[name]) {
  //     this.formGroup.errors[name] = true;
  //   } else {
  //     delete this.formGroup.errors[name];
  //   }

  //   if (Object.keys(this.formGroup.errors).length == 0) {
  //     this.formGroup.setErrors(null);
  //   }
  // }


  public goBack() {
    //this.navCtrl.back();
    this.route.navigateByUrl('/auth');
  }

  public confirmRecoveryPassword() {
    if (this.formInvalid()) {
      this.alertService.showLoading('Revise sua senha')
    }
    this.loading['password'] = true;
    this.reload();
    const newPassword = this.newPassword;//this.formGroup.get('newPassword').value;

    this.accountService.confirmRecoveryPassword(this.sellerId, this.code, newPassword).subscribe((response) => {
      this.loading['password'] = false;
      if (response.success) {
        this.alertService.showToastAlert("Senha alterada com sucesso.");
        this.route.navigateByUrl('/auth');
      } else {
        this.alertService.showToastAlert("Houve um erro tentar alterar sua senha.")
      }
    }, (err) => {
      this.loading['password'] = false;
      this.alertService.errorAlert(err);
    }, () => {
      this.loading['password'] = false;
      this.reload();
    })

  }

}
