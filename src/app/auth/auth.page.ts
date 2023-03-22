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
  ngOnInit(): void {
    document.body.classList.add('yellow');
    if(LocalStorage.IsLogged){
      document.body.classList.remove('yellow');
      this.route.navigateByUrl('/message');
    }
  }

  public async login(){
    this.loading = true;
    this.meliService.login('br',  (callBackParam)=> {
      if(callBackParam.success){
        LocalStorage.setLogin(callBackParam.sellerInfo);
        this.loading = false;
        //document.body.classList.remove('yellow');
        this.route.navigateByUrl('/message');
      }
      else{
        alert(`error. ${callBackParam.errorMessage}`)
      }
    }, this.target);
  }

  public loginFake(){
    this.loadingFake = true;
    setTimeout(() => {
      LocalStorage.fake().setLogin();
      this.loadingFake = false;
      //document.body.classList.remove('yellow');
      this.route.navigateByUrl('/message');
    }, 3000);
  }
}