import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../../auth/services/login.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(LoginService);
  const token = authService.getToken();
  const router = inject(Router);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        authService.logout();
      }

      return throwError(() => err);
    })
  );
};
