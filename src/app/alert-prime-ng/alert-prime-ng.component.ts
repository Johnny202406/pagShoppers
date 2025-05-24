import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-alert-prime-ng',
  imports: [ToastModule],
  templateUrl: './alert-prime-ng.component.html',
  styleUrl: './alert-prime-ng.component.css',
  standalone:true,
})

export class AlertPrimeNgComponent {
}
