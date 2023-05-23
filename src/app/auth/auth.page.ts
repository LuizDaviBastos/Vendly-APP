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
  public email: string = "davi-sdb@hotmail.com";
  public password: string = "80849903Dd@";

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
            //LocalStorage.setLogin(response.data);
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

  public loginFake() {
    this.loadingFake = true;
    setTimeout(() => {
      LocalStorage.fake().setLogin();
      this.loadingFake = false;
      //document.body.classList.remove('yellow');
      this.route.navigateByUrl('/message');
    }, 3000);
  }
}