import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto,detalles } from './get-data-base.service';
import { AlertService } from './alert.service';


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

  constructor(private alertService:AlertService) {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoProductos = JSON.parse(carritoGuardado);
      this.carritoSubject.next(this.carritoProductos);
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'carrito') {
        const nuevoCarrito = JSON.parse(event.newValue || '[]');
        this.carritoProductos = nuevoCarrito;
        this.carritoSubject.next(this.carritoProductos);
      }
    });
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carritoProductos));
    this.carritoSubject.next(this.carritoProductos);
  }

  añadirAlCarrito(producto: Producto, cantidad: number): void {
    const index = this.carritoProductos.findIndex(item => item.producto.id === producto.id);
    const subtotal=producto.precio*cantidad
    if (index !== -1) {
      this.carritoProductos[index].cantidad = cantidad;
      this.carritoProductos[index].subtotal =subtotal ;
    } else {
      this.carritoProductos.push({ producto, cantidad,subtotal  });
      this.alertService.show({ severity: 'success', summary: `Producto ${producto.nombre} agregado`, detail: 'Producto agregadodo al carrito de pedidos con éxito' })
    }

    this.guardarEnLocalStorage();
  }

  eliminarDelCarrito(productoId: number): void {
    this.carritoProductos = this.carritoProductos.filter(item => item.producto.id !== productoId);
    this.guardarEnLocalStorage();
  }

  limpiarCarrito(): void {
    this.carritoProductos = [];
    this.guardarEnLocalStorage();
  }

  calcularTotalCarrito(): number {
    return this.carritoProductos.reduce((total, item) => total + item.subtotal, 0);
  }

  obtenerCantidadTotal(): number {
    return this.carritoProductos.reduce((total, item) => total + item.cantidad, 0);
  }

  obtenerCarrito(): Carrito[] {
    return this.carritoProductos;
  }
  
  obtenerCantidadProducto(id: number): number {
    const item = this.carritoProductos.find(p => p.producto.id === id);
    return item?.cantidad || 0;
  }

  obtenerCarritoActu():detalles[]{
    const carrito= this.obtenerCarrito()
    return carrito.map(el=>{
      return {
        idproducto:el.producto.id,
        cantidad:el.cantidad,
      }
    })
  }

  generarMensajeWhatsApp(): string {
    const carrito= this.obtenerCarrito()
    if (!carrito.length) return "El carrito está vacío.";

    let mensaje = "Hola Shoppers, quiero realizar un pedido:%0A";
    let total = 0;

    carrito.forEach((item) => {
      mensaje += `- ${item.producto.nombre} x${item.cantidad} = S/ ${item.subtotal.toFixed(2)}%0A`;
      total += item.subtotal;
    });

    mensaje += `%0ATotal: S/ ${total.toFixed(2)}`;
    return mensaje;
  }


  
  
}
