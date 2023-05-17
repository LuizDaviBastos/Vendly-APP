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

  @Input('form') formGroup: FormGroup;
  @Input('previous') previousStep: () => void;
  @Input('next') nextStep: () => void;

  public loading = {};

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() { }

  public codeIsValid() {
    const constrol = this.formGroup.get('code');
    return !constrol.hasError('required') && !constrol.hasError('minlength');
  }
}


