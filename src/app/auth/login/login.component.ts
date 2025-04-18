import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, Observable, of, tap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Login } from '../models/login';
import { DinamicInputComponent } from '../../shared/dinamic-input/dinamic-input.component';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    DefaultLayoutComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DinamicInputComponent

  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loginError = false;
  loading$!: Observable<boolean>;
  
  usuarioControl!: FormControl;
  senhaControl!: FormControl;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LoginService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],  // Sem o new FormControl
      senha: ['', Validators.required]
    });

    this.usuarioControl = this.loginForm.get('usuario') as FormControl;
    this.senhaControl = this.loginForm.get('senha') as FormControl;
  }
  
  ngOnInit(): void {
    
    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = false;
    });
  }
  
  hide = signal(true);
  clickEvent(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
      if (this.loginForm.invalid) return;

      this.loading$ = this.service.loading$;
      const loginData: Login = this.loginForm.value;

      this.service.login(loginData).pipe(
        tap(_ => {
          setTimeout(() => {
            this.service.setLoading(false);
          }, 3000);
        }),
        catchError((err) => {
          setTimeout(() => {
            this.service.setLoading(false);
            this.loginError = true;
          }, 3000);
          return of(null);
        })
      ).subscribe();
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
