import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../models/signup';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
    delay(300)
  );
    
  private baseUrl: string = 'http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient, private service: LoginService) { }

  createUser(user: SignUp): Observable<JSON> {
    this.loadingSubject.next(true);
    return this.http.post<JSON>(this.baseUrl, user);
  }

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }
  
}
