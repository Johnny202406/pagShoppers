import { Component ,EventEmitter,Input, OnInit, Output, Pipe} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { ButtonsCardComponent } from '../buttons-card/buttons-card.component';
import { CarritoService } from '../cart.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-card-product',
  imports: [RouterLink,IconCartComponent,ButtonsCardComponent,CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent implements OnInit{
  constructor(private carritoService: CarritoService){}
  @Output() quantityChanged = new EventEmitter<{ productoId: number, cantidad: number }>();
  @Input() producto:any;
  
 
 
  cantidadActual = 0;

  ngOnInit() {
    this.carritoService.carrito$.subscribe(() => {
      if (this.producto?.id) {
        this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.producto.id);
      }
    });
  }
  
  addToCart(cantidad: number): void {
    if (this.producto) {
      // Usamos el servicio para agregar el producto al carrito
      this.carritoService.añadirAlCarrito(this.producto, cantidad);  
    }
  }
  getSlug(nombre: string): string {
    return nombre.toLowerCase().replace(/ /g, '-');
  }


  
  
}
