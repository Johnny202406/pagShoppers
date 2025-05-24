import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

export interface ToastOptions {
  severity: 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary';
  summary: string;
  detail: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
  closeIcon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private messageService:MessageService,

  ){}
  show(options:ToastOptions){
    this.messageService.add(options)
  }

}
