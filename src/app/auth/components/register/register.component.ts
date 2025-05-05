import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { DinamicInputComponent } from '../../../shared/components/dinamic-input/dinamic-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupService } from '../../services/signup-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DinamicLoadingButtonComponent } from '../../../shared/components/dinamic-loading-button/dinamic-loading-button.component';
import { SharedService } from '../../../shared/services/shared.service';

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
    MatFormFieldModule,
    DinamicLoadingButtonComponent
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
  isLoading: boolean = false;
  notEqual: boolean = true;
  signError: boolean = false;
  messageReqError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignupService,
    private shared: SharedService
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
      this.signError = true;
    })
  }

  onSubmit() {
    if(!this.notEqual) return;

    this.isLoading = true;
    const { nome, usuario, senha } = this.signForm.value;
    this.service.createUser({nome, usuario, senha}).pipe(
    ).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isLoading = false;
          this.shared.openSuccessDialog('Registro', 'realizado');
        }, 3000);
      },
      error: (error) => {
        setTimeout(() => {
          console.error('Erro capturado:', error);
          this.isLoading = false;
          let message = error?.error || 'Erro desconhecido';
          this.signError = true;
          this.messageReqError = message;
        }, 3000);
      }}
    );
  }

  back() {
    this.router.navigate(['auth/login']);
  }

}
