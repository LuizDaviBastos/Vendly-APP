import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/services/account-service';
import { AlertService } from 'src/services/alert-service';

@Component({
  selector: 'recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public loading: boolean = false;

  @Input('previous') previusStep: () => void;
  @Input('next') nextStep: () => void;

  constructor(private navCtrl: NavController,
    private accountService: AccountService,
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit() {

  }

  public goBack() {
    this.navCtrl.back();
  }

  public emailInvalid() {
    const control = this.formGroup.get('email');
    return (control.touched && control.status == "INVALID");
  }

  public formInvalid() {
    return !this.formGroup.touched || this.formGroup.status == "INVALID";
  }

  public recoveryEmail() {
    this.loading = true;
    const email = this.formGroup.get('email').value;
    this.accountService.recoveryPassword(email).subscribe((response) => {
      this.loading = false;
      if (response.success) {
        this.alertService.showToastAlert('Enviamos um email para que possa recuperar sua senha.');
        this.route.navigateByUrl('/auth');
      } else {
        this.alertService.showToastAlert(response.message);
      }
    }, (error) => {
      this.alertService.errorAlert(error);
    }, () => {
      this.loading = false;
    })
  }

}
