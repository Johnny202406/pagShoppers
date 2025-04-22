import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Carrito, CarritoService } from '../cart.service'; // <-- usa el tipo Carrito
import { ButtonsCardComponent } from "../buttons-card/buttons-card.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cards-carrito',
  templateUrl: './cards-carrito.component.html',
  styleUrls: ['./cards-carrito.component.css'],
  imports: [ButtonsCardComponent,CommonModule,RouterLink],
  standalone: true
})

export class CardsCarritoComponent implements OnInit {
  @Input() item!: Carrito;

  cantidadActual = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    if (this.item) {
      this.carritoService.carrito$.subscribe(() => {
        this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.item.producto.id);
      });
    }
  }

  addToCart(event: number) {
    if (this.item) {
      this.carritoService.añadirAlCarrito(this.item.producto, event);
    }
  }

  removeToCart() {
    if (this.item && confirm(`¿Está seguro de eliminar el producto\n ${this.item.producto.nombre}?`)) {
        this.carritoService.eliminarDelCarrito(this.item.producto.id);
    }
  }
  getSlug(nombre: string): string {
    return nombre.toLowerCase().replace(/ /g, '-');
  }
}
