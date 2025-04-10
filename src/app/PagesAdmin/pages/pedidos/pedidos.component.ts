import { Component, OnInit } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
interface Pedido {
  id: string;
  dni: string;
  telefono: string;
  estado: number;
  fecha: string;
  hora: string;
}


interface Estado {
  id: number;
  descripcion: string;
  color: string;
}
@Component({
  selector: 'app-pedidos',
  imports: [Select,FormsModule,InputTextModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent  implements OnInit{
  value?: string;

  estados?: Estado[] | undefined;

  selectedEstado: Estado | undefined;

  ngOnInit() {
    this.estados = [
      { id: 0, descripcion: "Nuevo", color: "#F59E0B" }, 
      { id: 1, descripcion: "En Proceso", color: "#3B82F6" },
      { id: 2, descripcion: "Completado", color: "#10B981" },
      { id: 3, descripcion: "Cancelado", color: "#EF4444" }  
    ];
  }
  encabezados:string[] = ["Id", "Dni", "Teléfono", "Estado", "Detalles"];

  
  pedidos: Pedido[] = [
    { id: "001", dni: "12345678", telefono: "987654321", estado: 0, fecha: "2023-04-01", hora: "10:00" },
    { id: "002", dni: "23456789", telefono: "987654322", estado: 1, fecha: "2023-04-02", hora: "11:00" },
    { id: "003", dni: "34567890", telefono: "987654323", estado: 2, fecha: "2023-04-03", hora: "12:00" }
  ];
  estados2 = [
    { id: 0, descripcion: "Nuevo", color: "#F59E0B" }, 
    { id: 1, descripcion: "En Proceso", color: "#3B82F6" },
    { id: 2, descripcion: "Completado", color: "#10B981" },
    { id: 3, descripcion: "Cancelado", color: "#EF4444" }  
  ];

  busqueda(){
    console.log(this.value);
    
  }
    
 
  
  
  
}



