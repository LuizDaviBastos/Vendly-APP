import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AlertService } from 'src/services/alert-service';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['../../signup.component.scss', './step4.component.scss'],
})
export class Step4Component implements OnInit {

  @Input('sellerId') sellerId: string;
  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;

  public loading = {};

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() { }

  public get email() {
    return LocalStorage.getLogin()?.data?.email;
  }

  public onError(message: string) {

  }

  public onSuccess() {
    const login = LocalStorage.getLogin();
    if (login && login.emailNotConfirmed == true) {
      login.emailNotConfirmed = false;
      login.data.confirmedEmail = true;
      LocalStorage.setLogin(login);
    }
    this.nextStep();
  }
}


