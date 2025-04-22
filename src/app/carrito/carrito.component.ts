import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../cart.service';
import { CardsCarritoComponent } from '../cards-carrito/cards-carrito.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, CardsCarritoComponent]
})
export class CarritoComponent implements OnInit {
  visible:boolean = false;
  deleteText:string = "¿Está seguro de limpiar el carrito de compras, esta acción es irreversible?"

  constructor(private carritoService: CarritoService) {}

  productosEnCarrito: Carrito[] = [];

  ngOnInit() {
    this.carritoService.carrito$.subscribe(() => {
      this.productosEnCarrito = this.carritoService.obtenerCarrito();;
    });
  }

  getTotal(): number {
    return this.carritoService.calcularTotalCarrito();
  }
  
  clearCart() {
    if(confirm(this.deleteText)) this.carritoService.limpiarCarrito();
    return
  }
}
