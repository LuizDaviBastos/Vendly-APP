import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { Seller } from 'src/models/seller';
import { AlertService } from 'src/services/alert-service';
import { AuthService } from 'src/services/auth-service';
import { MeliService } from 'src/services/meli-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public loading = {};
  public currentStep: 1 | 2 | 3 | 4 | 5 = 1;
  public stepsFormGroup = {
    1: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
    2: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      country: new FormControl('', [Validators.required]),
    }),
    3: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }),
    4: new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[0-9]*$")])
    }),
    5: new FormGroup({
      sync: new FormControl('', [Validators.required, Validators.pattern("^(true)$")])
    })
  }

  public getSellerEntity() {
    return <Seller>{
      email: this.stepsFormGroup[1].get('email').value,
      fullName: this.stepsFormGroup[2].get('name').value,
      country: this.stepsFormGroup[2].get('country').value,
      password: this.stepsFormGroup[3].get('password').value,
    }
  }

  constructor(private alertService: AlertService,
    private authService: AuthService,
    private meliService: MeliService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router) {

  }

  public async ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      const step = <1 | 2 | 3 | 4 | 5>+params.get('step');
      if (step && step == 5) {
        const loading = await this.loadingController.create({
          duration: -1,
          message: "Carregando..",
          animated: true
        });
        loading.present();
        const id = LocalStorage.getLogin().data.id;
        const hasMeliAccount = await this.meliService.hasMeliAccount(id).toPromise();
        if(hasMeliAccount) {
          this.stepsFormGroup[5].get('sync').setValue('true');
        }
        
        this.currentStep = step;
        loading.dismiss();
      }
    })

  }

  private _nextStep() {
    if (this.currentStep >= 5) return;
    this.currentStep++;
    console.log(this.getSellerEntity());
  }

  public nextStep() {
    if (this.currentStep == 3) {
      this.saveAccountAndSendEmailConfirmationCode();
    } else {
      this._nextStep();
    }
  }

  public previousStep() {
    if (this.currentStep <= 1) return;
    this.currentStep--;
    console.log(this.getSellerEntity());
  }

  public formInvalid() {
    return (this.stepsFormGroup[this.currentStep].status == "INVALID")
  }

  public confirmEmail() {
    this.loading['confirm'] = true;
    const code = this.stepsFormGroup[4].get('code').value;
    const sellerId = LocalStorage.getLogin().data.id;
    this.authService.confirmEmail(sellerId, code).subscribe((confirmEmailResponse) => {
      this.loading['confirm'] = false;
      if (confirmEmailResponse.success) {
        this._nextStep();
      } else {
        this.alertService.showToastAlert(confirmEmailResponse.message);
      }
    }, (err) => {
      this.loading['confirm'] = false;
      this.alertService.errorAlert(err);
    })
  }

  public finish() {
    this.loading['finish'] = true;
    const login = LocalStorage.getLogin();
    login.hasMeliAccount = true;

    this.meliService.getSellerInfo(login.data.id).subscribe((response) => {
      if (response.success) {
        login.data = response.data;
        LocalStorage.setLogin(login);
        this.router.navigateByUrl('/message');
      } else {
        this.loading['finish'] = false;
        this.alertService.showToastAlert(response.message);
      }

    }, (err) => {
      this.loading['finish'] = false;
      this.alertService.errorAlert(err);
    })

  }

  private saveAccountAndSendEmailConfirmationCode() {
    this.loading['nextStep'] = true;
    this.authService.saveAccount(this.getSellerEntity()).subscribe((loginResponse) => {
      if (loginResponse.success) {
        LocalStorage.setLogin(loginResponse.data);
        this.authService.sendEmailConfirmationCode(loginResponse.data.data.id).subscribe((sendConfirmationResponse) => {
          this.loading['nextStep'] = false;
          if (sendConfirmationResponse.success) {
            this._nextStep();
          } else {
            this.alertService.showToastAlert(sendConfirmationResponse.message);
          }
        }, (err) => {
          this.loading['nextStep'] = false;
          this.alertService.errorAlert(err);
        })
      } else {
        this.alertService.showToastAlert(loginResponse.message);
      }
    }, (err: HttpErrorResponse ) => {
      this.loading['nextStep'] = false;
      this.alertService.errorAlert(err);
    })
  }
}
