import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';
import { MeliService } from 'src/services/meli-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(!LocalStorage.IsLogged){
      this.router.navigate(['/auth']);
      return false;
    }

    if(!LocalStorage.getLogin()?.hasMeliAccount) {
      debugger;
      return this.meliService.hasMeliAccount(LocalStorage.getLogin().data.id).pipe(
        map((hasMeliAccount) => {
          if (!hasMeliAccount) {
            this.meliService.addMeliAccount(LocalStorage.getCountry())
            return false;
          } else {
            this.router.navigate(['/auth']);
            return false;
          }
        })
      );
    }
    return LocalStorage.IsLogged;
    return this.meliService.isAuthenticated(LocalStorage.token).pipe(
      map((isAuthenticated) => {
        if(isAuthenticated) {
          return true;
        }
        else {
          LocalStorage.setToken(null);
          this.router.navigate(['/auth']);
          return false;
        }

      }) 
    )
  }
}
