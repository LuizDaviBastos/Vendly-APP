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
  public loadingFake: boolean = false;
  public target: string;
  public email: string = '';
  public password: string = '';

  public navigateUrl: string;

  public navigate() {
    this.route.navigateByUrl(this.navigateUrl);
  }

  ngOnInit(): void {

  }

  public async login() {
    try {
      this.loading = true;
      this.meliService.login(this.email, this.password).subscribe((response) => {
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
}