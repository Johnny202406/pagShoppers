import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent { 
  visible:boolean=false
  isRemove?:boolean
  confirmar(){
    this.isRemove= confirm("¿Estás seguro de remover el producto del carrito?")
    if (this.isRemove) console.log("Producto Removido de carrito");
    
  }
}
