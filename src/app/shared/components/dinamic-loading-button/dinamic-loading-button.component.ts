import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dinamic-loading-button',
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './dinamic-loading-button.component.html',
  styleUrl: './dinamic-loading-button.component.scss',
  standalone:true,
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.5)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DinamicLoadingButtonComponent {

  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() spinnerSize = 20; // Tamanho reduzido para ficar melhor ao lado do texto
  @Input() spinnerColor: 'primary' | 'accent' | 'warn' = 'accent';
  @Input() buttonClass = '';
  @Input() deleteItem: boolean = false;
  @Input() actionButton: string = '';

  @Output() btnClick = new EventEmitter<void>();
  
  onClick(): void {
    if (!this.isLoading && !this.disabled) {
      this.btnClick.emit();
    }
  }

}
