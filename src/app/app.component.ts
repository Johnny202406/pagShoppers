import { Component } from '@angular/core';
import { RouterOutlet,NavigationEnd,Router } from '@angular/router';
import { AlertPrimeNgComponent } from './alert-prime-ng/alert-prime-ng.component';
import { ConfirmPrimeNgComponent } from './confirm-prime-ng/confirm-prime-ng.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AlertPrimeNgComponent,ConfirmPrimeNgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
})
export class AppComponent {
  title = 'pagShoppers';
 


}

