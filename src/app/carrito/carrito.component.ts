import { Component } from '@angular/core';
import { CardsCarritoComponent } from '../cards-carrito/cards-carrito.component';

@Component({
  selector: 'app-carrito',
  imports: [CardsCarritoComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent { 
  visible:boolean=false
  
}
