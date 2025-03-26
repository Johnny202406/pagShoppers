import { Component } from '@angular/core';
import { ButtonsCardComponent } from '../buttons-card/buttons-card.component';

@Component({
  selector: 'app-cards-carrito',
  imports: [ButtonsCardComponent],
  templateUrl: './cards-carrito.component.html',
  styleUrl: './cards-carrito.component.css'
})
export class CardsCarritoComponent {

  isRemove?:boolean
  confirmar(){
    this.isRemove= confirm("¿Estás seguro de remover el producto del carrito?")
    if (this.isRemove) console.log("Producto Removido de carrito");
    
  }
}
