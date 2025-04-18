import { Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { DinamicInputComponent } from '../../shared/dinamic-input/dinamic-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupService } from '../services/signup-service.service';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { UtilsService } from '../../shared/utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  imports: [
    DefaultLayoutComponent,
    DinamicInputComponent,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  signForm!: FormGroup;
  usuarioControl!: FormControl;
  senhaControl!: FormControl;
  confirmaSenhaControl!: FormControl;
  nomeControl!: FormControl;
  fotoControl!: FormControl;
  loading$!: Observable<boolean>;
  notEqual: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignupService,
    private util: UtilsService
  ) {
    this.signForm = this.fb.group({
      nome: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      confirmaSenha: ['', Validators.required],
    });
    this.nomeControl = this.signForm.get('nome') as FormControl;
    this.usuarioControl = this.signForm.get('usuario') as FormControl;
    this.senhaControl = this.signForm.get('senha') as FormControl;
    this.confirmaSenhaControl = this.signForm.get('confirmaSenha') as FormControl;
  }
  ngOnInit(): void {
    this.confirmaSenhaControl.valueChanges.subscribe(value => {
      value === this.senhaControl.value ? this.notEqual = true : this.notEqual = false;
    })
  }

  onSubmit() {

    if(!this.notEqual) return;

    this.loading$ = this.service.loading$;
    const request$ = this.service.createUser(this.signForm.value).pipe(
      tap(_ => {
        setTimeout(() => {
          this.service.setLoading(false);
        }, 3000);
      }),
      catchError((err) => {
        setTimeout(() => {
          this.service.setLoading(false);
        }, 3000);
        return of(null);
      })
    ).subscribe();
  }

  back() {
    this.router.navigate([''])
  }
}
