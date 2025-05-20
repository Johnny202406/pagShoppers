import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService, Carrito } from 'src/app/cart.service';
import { ButtonsCardComponent } from '../../buttons-card/buttons-card.component';
import { GetDataBaseService } from 'src/app/get-data-base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards-carrito',
  templateUrl: './cards-carrito.component.html',
  styleUrls: ['./cards-carrito.component.css'],
  imports: [ButtonsCardComponent, CommonModule, RouterLink],
  standalone: true
})
export class CardsCarritoComponent implements OnInit, OnDestroy {
  @Input() item!: Carrito;
  cantidadActual = 0;
  selectedUrl = 'noImg.jpg';  // Imagen por defecto
  private carritoSubscription!: Subscription; // Suscripción al carrito

  constructor(
    private carritoService: CarritoService,
    private dbService: GetDataBaseService
  ) {}

  ngOnInit(): void {
    if (this.item?.producto?.imagenes?.length) {
      this.selectedUrl = this.item.producto.imagenes[0].url || 'noImg.jpg';
    }

    this.carritoSubscription = this.carritoService.carrito$.subscribe(() => {
      this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.item.producto.id);
    });
  }

  ngOnDestroy(): void {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();  // Evitar fugas de memoria
    }
  }

  addToCart(event: number): void {
    if (this.item) {
      this.carritoService.añadirAlCarrito(this.item.producto, event);
    }
  }

  removeToCart(): void {
    if (this.item && confirm(`¿Está seguro de eliminar el producto\n ${this.item.producto.nombre}?`)) {
      this.carritoService.eliminarDelCarrito(this.item.producto.id);
    }
  }

  getSlug(url: string): string {
    return this.dbService.urlBonita(url);
  }
}
