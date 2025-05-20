import { Component, OnInit, ViewChild } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GetDataBaseService,Pedido,estado_pedidos } from 'src/app/get-data-base.service';
import { TableModule,Table} from 'primeng/table';
import { CommonModule } from '@angular/common';
import { environment } from '@environnments/environment';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-pedidos',
  imports: [Dialog,CommonModule,InputIconModule, IconFieldModule, InputTextModule, FloatLabelModule, FormsModule,Select,FormsModule,InputTextModule,ButtonModule,DatePicker,TableModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  standalone:true,
  providers: [MessageService],
  
})
export class PedidosComponent  implements OnInit{

  envs=environment
  
  constructor(private router: Router,private dbService: GetDataBaseService,private messageService: MessageService,) {}
  
  colores:string[] = ['','#F59E0B', '#3B82F6', '#10B981', '#EF4444'];
  headers:string[]=["Id","Dni","Contacto","Fecha","Hora","Total","Estado","Detalles"]

  headersDetalles:string[]=["Código","Nombre","Precio","Cantidad","Subtotal"]

  estados?: estado_pedidos[] | undefined;
  
  maxDate: Date = new Date();
  ngOnInit() {
   this.dbService.getEstadoPedidos().subscribe((data) => {
      this.estados = data;
    })

    this.loadPedidos()
  }

  date: Date = this.maxDate;
  selectedEstado: estado_pedidos | undefined;
  value?: string;

   @ViewChild('dt') table!: Table;
   
   pedidos: Pedido[] = [];
   totalRecords: number = 0;
   pageSize:number=5
   currentPage: number = 1;
   
   search() {
     this.currentPage = 1; // Siempre volver a la primera página en una nueva búsqueda
     if (this.table) {
       this.table.first = 0; // Esto resetea visualmente el paginador
     }
     this.loadPedidos();
   }
   
   loadCustomers(event: any) {
     if (event) {
       this.pageSize = event.rows ?? 5;
       this.currentPage = Math.floor((event.first ?? 0) / this.pageSize) + 1;
     }
     this.loadPedidos();
   }
   
   
  loadPedidos() {
    console.log("FUNCk");

    const fecha = this.date ? this.date.toISOString().split('T')[0] : undefined;  // 'null' en lugar de undefined
    const estadoId = this.selectedEstado ? this.selectedEstado.id : undefined;  // 'null' en lugar de undefined

    this.dbService.getPedidos(this.currentPage, this.pageSize, fecha, estadoId, this.value).subscribe((response) => {
      this.pedidos = response.pedidos;
      this.totalRecords = response.totalRecords;
    });
  }

    pedidoRefer?:Pedido
   verDetalles(pedido:Pedido){
    return this.pedidoRefer=pedido
   }

  //  ACTUALIZAR PEDIDO
  position:'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'="top"
  visibleModal: boolean = false;
  estadoParaActualizarPedido: estado_pedidos | undefined;
  selectedPedidos:Pedido[]=[]
  showDialog() {
      this.visibleModal = !this.visibleModal;
      
  }
    
  actualizarPedido(){
    if(!this.selectedPedidos) return alert("No hay pedidos seleccionados")
    if(!this.estadoParaActualizarPedido) return alert("Estado no seleccionado")
    
    const obj={
      idestado:this.estadoParaActualizarPedido.id,
      pedidos:this.selectedPedidos.map((pedido)=>{
        return pedido.id
      })
    }
    
    
    this.dbService.actualizarPedidos(obj).subscribe(()=>{
      this.loadPedidos()
      this.showDialog()
      this.selectedPedidos=[]
      this.estadoParaActualizarPedido=undefined
    })

  }  

 
}



