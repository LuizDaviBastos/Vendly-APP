import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggoutService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (LocalStorage.IsLogged && LocalStorage.getLogin().hasMeliAccount) {
      this.router.navigate(['/message']);
      return false;
    }
    else {
      return true;
    }
  }
}
