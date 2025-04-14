import { Component, Input } from '@angular/core';
import { productos } from '../data-example';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  visibleMovil:boolean=false
  
  filters:any[]=[1,2,3]
  
  openDetails: boolean[] = [];

  getMarcasConCantidad(productos: any[]): any[] {
    // Contamos las marcas y la cantidad de productos por marca
    const marcas = productos.reduce((acc, producto) => {
      if (acc[producto.marca]) {
        acc[producto.marca].cantidad++;
      } else {
        acc[producto.marca] = { marca: producto.marca, cantidad: 1 };
      }
      return acc;
    }, {});

    
    // Convertimos el objeto en un array para devolverlo
    return Object.values(marcas);
  }
  marcas=this.getMarcasConCantidad(productos)

  
  

  toggleDetail(index: number) {
    this.openDetails[index] = !this.openDetails[index];
  }
}
