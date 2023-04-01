import { LocalStorage } from '../helpers/local-storage.helper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeliService } from 'src/services/meli-service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss']
})
export class AuthPage implements OnInit {
  constructor(private route: Router, private meliService: MeliService) { }

  public loading: boolean = false;
  public loadingFake: boolean = false;
  public target: string;
  public email: string;
  public password: string;

  ngOnInit(): void { }

  public async login() {
    this.loading = true;

    this.meliService.login(this.email, this.password).subscribe((response) => {
      if (response.success) {
        LocalStorage.setLogin(response.data);
        this.route.navigateByUrl('/message');
      }
    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    })
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