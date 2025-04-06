import { Component ,Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { ButtonsCardComponent } from '../buttons-card/buttons-card.component';


@Component({
  selector: 'app-card-product',
  imports: [RouterLink,IconCartComponent,ButtonsCardComponent],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() producto:any;
}
