import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '@environnments/environment';
import { productos } from '../../data-example';
import { SearchCategoryComponent } from '../search-category/search-category.component';
import { GetDataBaseService, Producto } from 'src/app/get-data-base.service';
import { GetDataService } from 'src/app/get-data.service';


@Component({
  selector: 'app-main',
  imports: [SearchCategoryComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private dbService: GetDataBaseService,private productoService: GetDataService,){}
  envs=environment
  data:Producto[]=[]
  ngOnInit() {
  }

  objDate:Date=new Date()
  textoFecha:string=`${this.nameDay(this.objDate.getDay())} ${this.objDate.toLocaleDateString()}`
  nameDay(diaSemana:number):string{
    switch (diaSemana) {
      case 0:
          return "Domingo";
          break;
      case 1:
          return "Lunes";
          break;
      case 2:
          return "Martes";
          break;
      case 3:
          return "Miércoles";
          break;
      case 4:
          return "Jueves";
          break;
      case 5:
          return "Viernes";
          break;
      case 6:
          return "Sábado";
          break;
      default:
          return "Desconocido";
  }
  
  }

  tutorial:any[] = [
    {
        icono: "pi-search", 
        titulo: "Realize una búsqueda", 
        descripcion: "Ingrese lo que necesite en el buscador o seleccione una categoría para explorar los productos disponibles."
    },
    {
        icono: "pi-eye", 
        titulo: "Observe los productos", 
        descripcion: "Podrá ver los detalles de cada producto y filtrar según el precio, marcas y otras opciones para encontrar lo que necesita."
    },
    {
        icono: "pi-shopping-cart", 
        titulo: "Agregue al carrito los productos", 
        descripcion: "Seleccione los productos y la cantidad deseada, luego agréguelos al carrito de compras para continuar con su pedido."
    },
    {
        icono: "pi-check", 
        titulo: "Realice su pedido", 
        descripcion: "Complete su información, como DNI y teléfono, luego confirme para proceder con el pedido. Se comunicarán en breve contigo."
    }
];

}

