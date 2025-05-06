import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { timeout } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { DinamicInputComponent } from '../../../shared/components/dinamic-input/dinamic-input.component';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { DinamicLoadingButtonComponent } from '../../../shared/components/dinamic-loading-button/dinamic-loading-button.component';

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
    DinamicInputComponent,
    DinamicLoadingButtonComponent
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loginError = false;
  isLoading: boolean = false;
  errorFromRequest: String = '';
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
    this.service.loginError$.subscribe(value => this.loginError = value);
    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = false;
    });
    this.service.loading$.subscribe(value => this.isLoading = value);
  }
  
  hide = signal(true);
  clickEvent(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  onSubmit() {
    if (this.isLoading || this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.loginError = false; // Resetar o erro antes de fazer a requisição
    
    this.service.login(this.loginForm.value)
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
