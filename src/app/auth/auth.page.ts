import { LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestResponse } from 'src/models/request-response.model';
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
  public email: string = "";
  public password: string = "";

  ngOnInit(): void { }

  public async login() {
    try {
      this.loading = true;
      this.meliService.login(this.email, this.password).subscribe((response) => {
        if (response.success) {
          LocalStorage.setLogin(response.data);
          this.route.navigate(['/message']);
        } else {
          this.alertService.showToastAlert(response.message);
        }
      }, (error) => {
        this.alertService.showToastAlert(error?.error?.message || 'Houve um erro ao tentar fazer login');
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