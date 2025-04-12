import { Component } from '@angular/core';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductoService } from '../get-data.service';
import { NavigationComponent } from "../navigation/navigation.component";
import { SearchCategoryComponent } from "../search-category/search-category.component";

@Component({
  selector: 'app-product-alone',
  templateUrl: './product-alone.component.html',
  styleUrls: ['./product-alone.component.css'],
  imports: [IconCartComponent, NavigationComponent, SearchCategoryComponent]
})
export class ProductAloneComponent {

  // Array con las URLs de las imágenes
  listImgs: string[] = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080',
    'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080',
    'https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080'
  ];

  // Inicializamos la imagen seleccionada con la primera URL del array
  selectedImageUrl: string = this.listImgs[0];

  // Método para cambiar la imagen principal
  changeImage(url:string): any {
    if (url === this.selectedImageUrl) return; 
    if(this.listImgs.includes(url)) return this.selectedImageUrl = url 
  }

  producto: any = null;
  nombre:string=''

  constructor(private route: ActivatedRoute, private productoService: ProductoService,private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombre = params['id'];
      // Ahora puedes usar categoryId para cargar datos específicos de la categoría
      console.log(this.nombre);
      if (this.nombre) {
        this.producto = this.productoService.getOneProduct(this.nombre);
        this.producto=== null?this.router.navigate([`/`]):''
      }
    });
    
  }
  
}
