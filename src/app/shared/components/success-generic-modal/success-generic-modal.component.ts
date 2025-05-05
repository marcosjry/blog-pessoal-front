import { Component, Inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DinamicLoadingButtonComponent } from '../dinamic-loading-button/dinamic-loading-button.component';

@Component({
  selector: 'app-generic-modal',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    DinamicLoadingButtonComponent
  ],
  templateUrl: './success-generic-modal.component.html',
  styleUrl: './success-generic-modal.scss'
})
export class SuccessGenericModalComponent {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<SuccessGenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string}
  ) {}

  onContinueClick(): void {
    this.dialogRef.close();
  }

}
