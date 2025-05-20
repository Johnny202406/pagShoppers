import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-icon-cart',
  imports: [ButtonModule],
  templateUrl: './icon-cart.component.html',
  styleUrl: './icon-cart.component.css'
})
export class IconCartComponent {
  icon:string="cart-plus"
}
