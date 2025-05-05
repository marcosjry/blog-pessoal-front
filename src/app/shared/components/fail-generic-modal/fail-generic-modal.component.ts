import { Component, Inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { DinamicLoadingButtonComponent } from '../dinamic-loading-button/dinamic-loading-button.component';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fail-generic-modal',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    DinamicLoadingButtonComponent
  ],
  templateUrl: './fail-generic-modal.component.html',
  styleUrl: './fail-generic-modal.component.scss'
})
export class FailGenericModalComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<FailGenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string}
  ) {}

  onContinueClick(): void {
    this.dialogRef.close();
  }
}
