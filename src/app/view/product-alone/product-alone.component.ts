import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../cart.service'; 
import { GetDataService } from '../../get-data.service';
// import { productos } from '../../data-example';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { NavigationComponent } from "../navigation/navigation.component";

import { ButtonsCardComponent } from "../buttons-card/buttons-card.component";
import { SearchCategoryComponent } from '../search-category/search-category.component';
import { Producto ,GetDataBaseService,Imagenes} from 'src/app/get-data-base.service';

@Component({
  selector: 'app-product-alone',
  templateUrl: './product-alone.component.html',
  styleUrls: ['./product-alone.component.css'],
  imports: [
    CommonModule, // Add CommonModule here
    IconCartComponent,
    NavigationComponent,
    /*SearchCategoryComponent,*/
    ButtonsCardComponent,
    SearchCategoryComponent
]
})
export class ProductAloneComponent {
  producto: Producto | null = null;
  nombre: string = '';
  // data: Producto[] = productos.slice(20,30);

  selectedImageUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private productoService: GetDataService,
    private router: Router,
    private carritoService: CarritoService ,
    private dbService:GetDataBaseService,
  ) {}
  cantidadActual = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombre =this.dbService.urlOriginal(params['id']);
      console.log(this.nombre);

      if (this.nombre) {
        this.dbService.getProductoString(this.nombre).subscribe((response) => {
          // console.log(response);
          
          this.producto = response;
          if (this.producto) {
            this.selectedImageUrl = this.producto?.imagenes?.[0]?.url || 'noImg.jpg';
       
            this.carritoService.carrito$.subscribe(() => {
              if (this.producto) {
                this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.producto.id);
              }
            });
          } else {
            // this.router.navigate(['/']);
          }
      })   
      }
    });
  }
  

  changeImage(img: string): void {
      this.selectedImageUrl = img;
  }

  // Método para agregar al carrito con la cantidad
  addToCart(cantidad: number): void {
    if (this.producto) {
      this.carritoService.añadirAlCarrito(this.producto, cantidad);  // Usamos el servicio para agregar el producto al carrito
      // alert('Producto agregado al carrito');
    }
  }
}
