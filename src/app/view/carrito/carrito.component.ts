import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../../cart.service';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CardsCarritoComponent } from './cards-carrito/cards-carrito.component';
import { pedido,GetDataBaseService } from 'src/app/get-data-base.service';




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

  constructor(private carritoService: CarritoService,private dbService:GetDataBaseService) {}

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
    dni: new FormControl(null,[Validators.min(10000000),Validators.max(99999999)]),
    contacto: new FormControl( null,[Validators.required, Validators.min(900000000),Validators.max(999999999)])
  });
  

  enviarPedido(){
    if(this.miFormulario.invalid) return alert("Complete todos los campos requeridos.")

    const dni=this.miFormulario.get('dni')?.value
    const contacto=this.miFormulario.get('contacto')?.value

    if ( Number.isInteger(Number(contacto)) && this.productosEnCarrito.length>=1 && Number.isInteger(Number(dni))) {
      
      const pedido:pedido={
        dni:String(dni?dni:'').trim(),
        contacto:String(contacto).trim(),
        detalles:this.carritoService.obtenerCarritoActu()
      }

      this.dbService.subirPedidos(pedido).subscribe({
        next: () => {
          console.log(pedido);
          
          this.carritoService.limpiarCarrito()

          this.viewFormContacts()
          this.visible=false
          
          return alert("Pedido enviado con exito.")
        },
        error: () => {
          return alert("Pedido fallido.")
        },
        complete:()=>{
          
        }
      })
      
      
    }else{
      return alert("Invalido.")
    }
  }

  
}
