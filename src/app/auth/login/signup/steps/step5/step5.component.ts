import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorage } from 'src/app/helpers/local-storage.helper';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['../../signup.component.scss', './step5.component.scss'],
})
export class Step5Component implements OnInit {

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  public syncAccount() {
    const login = LocalStorage.getLogin();
    this.authService.addMeliAccount(true, login.data.country);
  }

  public synState() {
    return (this.formGroup.get('sync').value == 'true');
  }

}


