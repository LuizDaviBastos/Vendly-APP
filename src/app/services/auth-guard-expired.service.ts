import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';
import { MeliService } from 'src/services/meli-service';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from 'src/services/alert-service';
import { AccountService } from 'src/services/account-service';
import { ModalController } from '@ionic/angular';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { ModalService } from 'src/services/modal-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardExpiredInvalidService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService,
    private alertService: AlertService,
    private accountService: AccountService,
    private modalService: ModalService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accountService.expiredStatus(LocalStorage.sellerId).pipe(
      map((response) => {
        LocalStorage.expired = !response.data;
        if (response.data) {
          return true;
        } else {
          this.modalService.showSubscribeModal();
          return true;
        }
      }),
      catchError((err: any) => {
        this.alertService.showToastAlert("Houve um erro ao processar a requisição");
        return of(false)
      })
    )
  }

}


@Injectable({
  providedIn: 'root'
})
export class AuthGuardExpiredValidService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService,
    private alertService: AlertService,
    private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accountService.expiredStatus(LocalStorage.sellerId).pipe(
      map((response) => {
        if (response.data) {
          this.router.navigateByUrl('/message');
          return false;
        } else {
          return true;
        }
      }),
      catchError((err: any) => {
        this.alertService.showToastAlert("Houve um erro ao processar a requisição");
        return of(true)
      })
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardExpiredInvalidOfflineService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService,
    private alertService: AlertService,
    private accountService: AccountService,
    private modalService: ModalService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (LocalStorage.expired) {
      this.modalService.showSubscribeModal()
      return false;
    }

    return true;
  }
}