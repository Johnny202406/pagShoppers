import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../../cart.service';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CardsCarritoComponent } from './cards-carrito/cards-carrito.component';
import { pedido,GetDataBaseService } from 'src/app/get-data-base.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';





@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, CardsCarritoComponent,ReactiveFormsModule,ConfirmDialog,ToastModule,ButtonModule],
  standalone: true,
  providers: [ConfirmationService, MessageService],
})
export class CarritoComponent implements OnInit {
  visible:boolean = false;
  deleteText:string = "¿Está seguro de limpiar el carrito de compras, esta acción es irreversible?"

  constructor(private carritoService: CarritoService,private dbService:GetDataBaseService,private confirmationService: ConfirmationService, private messageService: MessageService) {}

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
    this.confirmComponent(this.deleteText,"Confirmación",()=>{
      this.carritoService.limpiarCarrito()
      return this.messageService.add({ severity: 'info', summary: 'Carrito Limpio', detail: 'Carrito limpiado con exito' });
    },
      this.procesoIncompleto)
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
  
  // CONFIRM DE PRIMENG
  position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'top';
  enviar(){
    this.confirmComponent("¿Estás seguro de enviar?","Confirmación",this.enviarPedido,this.procesoIncompleto)
  }

  enviarPedido=()=>{
    if(this.miFormulario.invalid) return this.messageService.add({ severity: 'warn', summary: 'Incompleto', detail: 'Complete todos los campos requeridos' });

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
          
          return this.messageService.add({ severity: 'success', summary: 'Pedido Enviado', detail: 'Pedido enviado con exito' });
        },
        error: () => {
          return this.messageService.add({ severity: 'error', summary: 'Pedido Fallido', detail: 'Pedido no enviado o rechazado' });
        },
        complete:()=>{
          
        }
      })
      
      
    }else{
      return  this.messageService.add({ severity: 'warn', summary: 'Invalido', detail: 'Datos invalidos' });
    }
  }
  procesoIncompleto=()=>{
    return this.messageService.add({severity: 'error',summary: 'Incompleto',detail: 'Proceso incompleto',life: 3000,});
  }

  confirmComponent(message:string,header:string,accept:Function,reject:Function,){
      this.confirmationService.confirm({
              message,
              header,
              icon: 'pi pi-info-circle',
              rejectButtonStyleClass: 'p-button-text',
              rejectButtonProps: {
                  label: 'Cancelar',
                  severity: 'secondary',
                  text: true,
              },
              acceptButtonProps: {
                  label: 'Confirmar',
                  text: true,
              },
              accept,
              reject,
              key: 'positionDialog',
          });
  }
  
}
