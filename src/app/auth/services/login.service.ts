import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { BehaviorSubject, catchError, delay, Observable, tap, throwError } from 'rxjs';
import { Token } from '../models/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
    delay(300)
  );

  value: string = '';

  private baseUrl = 'http://localhost:8080/api/usuarios/login';
  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<Token> {
    this.loadingSubject.next(true);
    return this.http.post<Token>(`${this.baseUrl}`, login);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }
  
  
}
