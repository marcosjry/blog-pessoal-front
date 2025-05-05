import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { BehaviorSubject, catchError, delay, Observable, tap, throwError } from 'rxjs';
import { AuthUser } from '../models/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
    delay(300)
  );

  private userIsAuthenticated: boolean = false;

  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private baseUrl = 'https://blog-pessoal-production.up.railway.app/api/usuarios';
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated$.subscribe(value => this.userIsAuthenticated = value);
   }

  login(login: Login) {
    return this.http.post<AuthUser>(`${this.baseUrl}/login`, login).subscribe({
      next: (response) => {
        setTimeout(()=> {
          this.isAuthenticatedSubject.next(true);
          this.setTokenToStorage(response);
          this.loadingSubject.next(false);
        }, 2000)
      },
      error: () => {
        setTimeout(() => {
          this.isAuthenticatedSubject.next(false);
          this.loadingSubject.next(false);
        }, 2000)
      }})
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserAuthenticated(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['auth/login']);
  }

  isAuthenticated() {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/auth/token`,  token);
  }

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }

  isUserAuthenticated() {
    return !!this.getToken();;
  }
  
  setTokenToStorage(auth: AuthUser) {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('userId', auth.usuarioId.toString());
    this.router.navigate(['']);
  }
  
}
