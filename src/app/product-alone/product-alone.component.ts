import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../cart.service'; 
import { GetDataService } from '../get-data.service';
import { Producto,productos } from '../data-example';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { SearchCategoryComponent } from "../search-category/search-category.component";
import { ButtonsCardComponent } from "../buttons-card/buttons-card.component";

@Component({
  selector: 'app-product-alone',
  templateUrl: './product-alone.component.html',
  styleUrls: ['./product-alone.component.css'],
  imports: [
    CommonModule,  // Add CommonModule here
    IconCartComponent,
    NavigationComponent,
    SearchCategoryComponent,
    ButtonsCardComponent
  ]
})
export class ProductAloneComponent {
  producto: Producto | null = null;
  nombre: string = '';
  data: Producto[] = productos.slice(20,30);

  listImgs: string[] = [
    "",
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080',
    'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080',
    
  ];

  selectedImageUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private productoService: GetDataService,
    private router: Router,
    private carritoService: CarritoService  // Inyectamos el CarritoService
  ) {}
  cantidadActual = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombre = params['id'];
      if (this.nombre) {
        this.producto = this.productoService.getOneProduct(this.nombre);
  
        if (this.producto) {
          this.listImgs[0]=this.producto.img
          this.selectedImageUrl=this.listImgs[0]
          
          // 🔁 Suscribirse al carrito para reflejar cambios
          this.carritoService.carrito$.subscribe(() => {
            if (this.producto) {
              this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.producto.id);
            }
          });
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }
  

  changeImage(url: string): void {
    if (url !== this.selectedImageUrl && this.listImgs.includes(url)) {
      this.selectedImageUrl = url;
    }
  }

  // Método para agregar al carrito con la cantidad
  addToCart(cantidad: number): void {
    if (this.producto) {
      this.carritoService.añadirAlCarrito(this.producto, cantidad);  // Usamos el servicio para agregar el producto al carrito
      // alert('Producto agregado al carrito');
    }
  }
}
