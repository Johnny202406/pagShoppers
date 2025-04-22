import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './data-example';

export interface Carrito {
  producto: Producto;
  cantidad: number;
  subtotal:number
}
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoProductos: Carrito[] = [];
  private carritoSubject = new BehaviorSubject<Carrito[]>([]);  // Observable del carrito
  public carrito$ = this.carritoSubject.asObservable();

  constructor() {
    // Recupera el carrito guardado en localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoProductos = JSON.parse(carritoGuardado);
      this.carritoSubject.next(this.carritoProductos);
    }

    // Escucha de cambios en localStorage entre pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'carrito') {
        const nuevoCarrito = JSON.parse(event.newValue || '[]');
        this.carritoProductos = nuevoCarrito;
        this.carritoSubject.next(this.carritoProductos);
      }
    });
  }

  private guardarEnLocalStorage(): void {
    // Guarda el carrito en localStorage y emite el nuevo estado
    localStorage.setItem('carrito', JSON.stringify(this.carritoProductos));
    this.carritoSubject.next(this.carritoProductos);
  }

  añadirAlCarrito(producto: Producto, cantidad: number): void {
    const index = this.carritoProductos.findIndex(item => item.producto.id === producto.id);
    const subtotal=producto.precio*cantidad
    if (index !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad y subtotal
      this.carritoProductos[index].cantidad = cantidad;
      this.carritoProductos[index].subtotal =subtotal ;
    } else {
      // Si el producto no está en el carrito, añádelo
      this.carritoProductos.push({ producto, cantidad,subtotal  });
    }

    this.guardarEnLocalStorage();
  }

  eliminarDelCarrito(productoId: number): void {
    // Elimina el producto del carrito
    this.carritoProductos = this.carritoProductos.filter(item => item.producto.id !== productoId);
    this.guardarEnLocalStorage();
  }

  limpiarCarrito(): void {
    this.carritoProductos = [];
    this.guardarEnLocalStorage();
  }

  calcularTotalCarrito(): number {
    // Calcula el total del carrito
    return this.carritoProductos.reduce((total, item) => total + item.subtotal, 0);
  }

  obtenerCantidadTotal(): number {
    // Obtiene la cantidad total de productos en el carrito
    return this.carritoProductos.reduce((total, item) => total + item.cantidad, 0);
  }

  obtenerCarrito(): Carrito[] {
    return this.carritoProductos;
  }
  obtenerCantidadProducto(id: number): number {
    const item = this.carritoProductos.find(p => p.producto.id === id);
    return item?.cantidad || 0;
  }
  
}
