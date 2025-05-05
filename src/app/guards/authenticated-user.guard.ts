import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate {


  authenticatedUser$: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    
    return this.loginService.isAuthenticated().pipe(
      map(response => {
            if (response !== "Autorização Negada.") {
              this.loginService.isAuthenticatedSubject.next(true);
              return true;
            } else {
              this.router.navigate(['']);
              this.loginService.isAuthenticatedSubject.next(false);
              return false;
            }
          }),
          catchError(() => {
            this.router.navigate(['']);
            this.loginService.isAuthenticatedSubject.next(false);
            return of(false);
          }))

  }
}
