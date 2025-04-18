import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dinamic-input',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DinamicInputComponent),
      multi: true
    }
  ],
  templateUrl: './dinamic-input.component.html',
  styleUrl: './dinamic-input.component.scss'
})
export class DinamicInputComponent implements ControlValueAccessor {
 
  @Input() formGroup!: FormGroup;
  @Input() formControl!: FormControl;
  @Input() label!: string;
  @Input() placeholder: string = '';  // Adicione isso
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() icon!: string;
  @Input() isPassword: boolean = false;
  @Input() name: string = '';
  
  @Output() iconClick = new EventEmitter<Event>();
  
  hidePassword: boolean = true;

  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
    this.iconClick.emit(event);
  }

  get passwordVisibilityIcon(): string {
    return this.hidePassword ? 'visibility_off' : 'visibility';
  }

  value: string = '';
  onChange: any = () => {}
  onTouched: any = () => {}



  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;  // Corrigido aqui
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementação opcional
  }


}
