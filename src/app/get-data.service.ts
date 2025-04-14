import { Injectable } from '@angular/core';
import { productos } from '../app/data-example';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos = productos; // Usamos los productos importados

  constructor() {}

  getAllProducts(){
    return productos
  }
  getOneProduct(nombre: string) {
    return this.productos.find(p => p.nombre.toLowerCase().replace(/ /g, '-') === nombre) || null;
  }
}
