import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService, Carrito } from 'src/app/cart.service';
import { ButtonsCardComponent } from '../../buttons-card/buttons-card.component';
import { GetDataBaseService } from 'src/app/get-data-base.service';
import { Subscription } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cards-carrito',
  templateUrl: './cards-carrito.component.html',
  styleUrls: ['./cards-carrito.component.css'],
  imports: [ButtonsCardComponent, CommonModule, RouterLink,ConfirmDialog,ToastModule,ButtonModule],
  standalone: true,
  providers: [ConfirmationService, MessageService],

})
export class CardsCarritoComponent implements OnInit, OnDestroy {
  @Input() item!: Carrito;
  cantidadActual = 0;
  selectedUrl = 'noImg.jpg';  // Imagen por defecto
  private carritoSubscription!: Subscription; // Suscripción al carrito

  constructor(
    private carritoService: CarritoService,
    private dbService: GetDataBaseService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.item?.producto?.imagenes?.length) {
      this.selectedUrl = this.item.producto.imagenes[0].url || 'noImg.jpg';
    }

    this.carritoSubscription = this.carritoService.carrito$.subscribe(() => {
      this.cantidadActual = this.carritoService.obtenerCantidadProducto(this.item.producto.id);
    });
  }

  ngOnDestroy(): void {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();  // Evitar fugas de memoria
    }
  }

  addToCart(event: number): void {
    if (this.item) {
      this.carritoService.añadirAlCarrito(this.item.producto, event);
    }
  }

  removeToCart(): void {
    if (this.item ) {
      
      this.confirmComponent(`¿Está seguro de eliminar el producto\n ${this.item.producto.nombre}?`,"Confirmación",()=>{
          this.messageService.add({ severity: 'info', summary: 'Producto retirado con éxito.', detail: 'Producto del carrito limpiado con éxito',life: 1000 });
          setTimeout(()=>{
            this.carritoService.eliminarDelCarrito(this.item.producto.id)
          },1000)
          
        },
        this.procesoIncompleto)
      return
    }
    return
  }

  getSlug(url: string): string {
    return this.dbService.urlBonita(url);
  }

  // CONFIRM DE PRIMENG
  position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'top';
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
  
  procesoIncompleto=()=>{
    return this.messageService.add({severity: 'error',summary: 'Incompleto',detail: 'Proceso incompleto',life: 3000});
  }

}
