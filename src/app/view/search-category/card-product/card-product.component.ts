import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconCartComponent } from '../../icon-cart/icon-cart.component';
import { ButtonsCardComponent } from '../../buttons-card/buttons-card.component';
import { CarritoService } from 'src/app/cart.service';
import { Producto, GetDataBaseService } from 'src/app/get-data-base.service';

@Component({
  selector: 'app-card-product',
  imports: [RouterLink, IconCartComponent, ButtonsCardComponent, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() producto?: any;
  @Output() quantityChanged = new EventEmitter<{ productoId: number, cantidad: number }>();

  selectedUrl: string = 'noImg.jpg';  // Default to 'noImg.jpg' in case no image is found
  cantidadActual = 0;

  constructor(
    private carritoService: CarritoService,
    private dbService: GetDataBaseService
  ) {}

  ngOnInit() {
    // this.carritoService.carrito$.subscribe(() => {
    //   if (this.producto?.id) {
    //     this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.producto.id);
       
    //   }
    // });

  }

  ngOnChanges() {
      // Asegúrate de que el producto existe antes de intentar acceder a su imagen
      if (this.producto && this.producto.imagenes && this.producto.imagenes.length > 0) {
        this.selectedUrl = this.producto.imagenes[0].url || 'noImg.jpg';
      } else {
        this.selectedUrl = 'noImg.jpg'; // Valor por defecto si no hay imágenes
      }
      this.carritoService.carrito$.subscribe(() => {
        if (this.producto?.id) {
          this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.producto.id);
         
        }
      });
     
  }

  addToCart(cantidad: number): void {
    if (this.producto) {
      this.carritoService.añadirAlCarrito(this.producto, cantidad);
    }
  }

  getSlug(url: string) {
    return this.dbService.urlBonita(url);
  }
}
