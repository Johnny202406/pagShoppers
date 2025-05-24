import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(
    private confirmationService:ConfirmationService,
  ){}

  confirm(message: string,): Promise<boolean> {
    return new Promise((resolve) => {

      this.confirmationService.confirm({
        message,
        header:'Confirmación',
        icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                text: true,
            },
            acceptButtonProps: {
                label: 'Confirmar',
                text: true,
            },
        accept: () => resolve(true),
        reject: () => resolve(false),
        key: 'globalConfirm'
      });
    });
  }

}
