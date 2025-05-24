import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../../cart.service';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CardsCarritoComponent } from './cards-carrito/cards-carrito.component';
import { pedido,GetDataBaseService } from 'src/app/get-data-base.service';


import { ButtonModule } from 'primeng/button';
import { AlertService } from 'src/app/alert.service';
import { ConfirmService } from 'src/app/confirm.service';
import { environment } from '@environnments/environment';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, CardsCarritoComponent,ReactiveFormsModule,ButtonModule],
  standalone: true,
})
export class CarritoComponent implements OnInit {
  envs=environment
  visible:boolean = false;

  constructor(
    private carritoService: CarritoService,
    private dbService:GetDataBaseService,
    private alertService: AlertService,
    private confirmService: ConfirmService, 

  ) {}

  productosEnCarrito: Carrito[] = [];

  ngOnInit() {
    this.carritoService.carrito$.subscribe(() => {
      this.productosEnCarrito = this.carritoService.obtenerCarrito();;
    });
  }

  getTotal(): number {
    return this.carritoService.calcularTotalCarrito();
  }
  
  async clearCart() {
    const confirmado = await this.confirmService.confirm("¿Está seguro de limpiar el carrito de pedidos?")
    if (confirmado) {
      this.carritoService.limpiarCarrito()
      this.alertService.show({ severity: 'info', summary: 'Carrito Limpio', detail: 'Carrito limpiado con exito' }); 
    }else{
      this.alertService.show({severity: 'info',summary: 'Incompleto',detail: 'Proceso incompleto',});
    }
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
  

  
  async enviar(){
    const confirmado = await this.confirmService.confirm("¿Estás seguro de enviar el pedido?")
    if (confirmado) {
      this.enviarPedido()
    }else{
      this.alertService.show({severity: 'info',summary: 'Incompleto',detail: 'Proceso incompleto',life: 3000,});
    }
    return
  }

  enviarPedido=()=>{
    if(this.miFormulario.invalid) return this.alertService.show({ severity: 'warn', summary: 'Incompleto', detail: 'Complete todos los campos requeridos' });

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
          
          return this.alertService.show({ severity: 'success', summary: 'Pedido Enviado', detail: 'Pedido enviado con exito' });
        },
        error: () => {
          return this.alertService.show({ severity: 'error', summary: 'Pedido Fallido', detail: 'Pedido no enviado o rechazado' });
        },
        complete:()=>{
          
        }
      })
      
      
    }else{
      return  this.alertService.show({ severity: 'warn', summary: 'Invalido', detail: 'Datos invalidos' });
    }
  }

  mensajeWhatsApp():string{
    return this.carritoService.generarMensajeWhatsApp()
  }

  
  
}
