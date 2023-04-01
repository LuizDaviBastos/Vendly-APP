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
  private get isAuthenticated(): boolean {
    return LocalStorage.IsLogged || false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(!this.isAuthenticated){
      this.router.navigate(['/auth']);
      return false;
    }
   
    return this.meliService.isAuthenticated(LocalStorage.token).pipe(
      map((response) => {
        if (response) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );

  }
}
