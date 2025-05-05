import { Injectable } from '@angular/core';
import { SuccessGenericModalComponent } from '../components/success-generic-modal/success-generic-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FailGenericModalComponent } from '../components/fail-generic-modal/fail-generic-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private dialog: MatDialog) { }

  openSuccessDialog(tipo: string, acao: string): void {
    const dialogRef = this.dialog.open(SuccessGenericModalComponent, {
      disableClose: true, 
      panelClass: 'dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: {
        title: `${tipo} ${acao} com Sucesso!`
      }
    });
  }

  openFailDialog(titulo: string, mensagem: string): void {
    const dialogRef = this.dialog.open(FailGenericModalComponent, {
      disableClose: true, 
      panelClass: 'dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: {
        title: titulo,
        message: mensagem
      }
    });
  }

}
