import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../cart.service';
import { CardsCarritoComponent } from '../cards-carrito/cards-carrito.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, CardsCarritoComponent,ReactiveFormsModule]
})
export class CarritoComponent implements OnInit {
  visible:boolean = false;
  deleteText:string = "¿Está seguro de limpiar el carrito de compras, esta acción es irreversible?"

  constructor(private carritoService: CarritoService) {}

  productosEnCarrito: Carrito[] = [];

  ngOnInit() {
    this.carritoService.carrito$.subscribe(() => {
      this.productosEnCarrito = this.carritoService.obtenerCarrito();;
    });
  }

  getTotal(): number {
    return this.carritoService.calcularTotalCarrito();
  }
  
  clearCart() {
    if(confirm(this.deleteText)) this.carritoService.limpiarCarrito();
    return
  }

  
  contactos:boolean=false
  viewFormContacts() {
    this.contactos=!this.contactos
  }

  miFormulario = new FormGroup({
    dni: new FormControl(''),
    numero: new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9)])
  });
  

  enviarPedido(){
    if(this.miFormulario.invalid) return alert("Complete todos los campos requeridos.")

    const dni=this.miFormulario.get('dni')?.value
    const numero=this.miFormulario.get('numero')?.value

    if ( Number.isInteger(Number(numero)) && this.productosEnCarrito.length>=1) {
      this.viewFormContacts()
      this.carritoService.limpiarCarrito()
      this.visible=false
      
      console.log(dni,numero,this.productosEnCarrito);
      
      return alert("Pedido enviado con exito.")
    }

    return alert("Invalido.")
  
  }

  
}
