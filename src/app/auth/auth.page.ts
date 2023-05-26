import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/services/alert-service';
import { MeliService } from 'src/services/meli-service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss']
})
export class AuthPage implements OnInit {
  constructor(private route: Router,
    private meliService: MeliService,
    private alertService: AlertService) { }

  public loading: boolean = false;
  public target: string;

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  public navigateUrl: string;

  public navigate() {
    this.route.navigateByUrl(this.navigateUrl);
  }

  ngOnInit(): void {

  }

  public async login() {
    try {
      this.loading = true;
      const email = this.formGroup.get('email').value;
      const password = this.formGroup.get('password').value;
      this.meliService.login(email, password).subscribe((response) => {
        if (response.success) {
          LocalStorage.setLogin(response.data);
          if (response.data.emailNotConfirmed) {
            this.route.navigateByUrl(`auth/signup?step=4&sellerId=${response.data.data.id}`);
          } else {
            this.route.navigate(['/message']);
          }

        } else {
          this.alertService.showToastAlert(response.message);
        }
      }, (error) => {
        this.alertService.errorAlert(error);
        this.loading = false;
      }, () => {
        this.loading = false;
      })

    }
    catch {
      this.loading = false;
    }
  }

  public signup() {
    this.route.navigateByUrl('auth/signup');
  }

  public recoveryPassword() {
    this.route.navigateByUrl('auth/recovery-password')
  }

  public emailInvalid() {
    const control = this.formGroup.get('email');
    return (control.touched && control.status == "INVALID");
  }

  public passwordInvalid() {
    const control = this.formGroup.get('password');
    return (control.touched && control.status == "INVALID");
  }

  public formInvalid() {
    return (this.formGroup.status == "INVALID");
  }
}