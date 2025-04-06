import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-categorie',
  imports: [FormsModule,SelectModule],
  templateUrl: './select-categorie.component.html',
  styleUrl: './select-categorie.component.css',
  standalone:true,
})




export class SelectCategorieComponent implements OnInit {
  constructor(private router: Router) {}

  categorias?: paises[] ;
  selectedCategory?: paises ;

  ngOnInit() {
      this.categorias = [
        { name: 'Bolígrafos y marcadores', code: 'BM' },
        { name: 'Lápices y portaminas', code: 'LP' },
        { name: 'Carpetas y archivadores', code: 'CA' },
        { name: 'Cuadernos y libretas', code: 'CL' },
        { name: 'Hojas y papeles', code: 'HP' },
        { name: 'Pegamento y adhesivos', code: 'PA' },
        { name: 'Cinta adhesiva', code: 'CA' },
        { name: 'Reglas y escuadras', code: 'RE' },
        { name: 'Tijeras y cortadores', code: 'TC' },
        { name: 'Papel de envolver y regalo', code: 'PE' },
        { name: 'Calculadoras', code: 'CA' },
        { name: 'Estuches y organizadores', code: 'EO' },
        { name: 'Papel de impresora', code: 'PI' },
        { name: 'Pinturas y pinceles', code: 'PP' },
        { name: 'Etiquetas y adhesivos', code: 'EA' },
        { name: 'Suministros para oficina', code: 'SO' },
        { name: 'Sellos y tinta', code: 'ST' },
        { name: 'Accesorios para escritura', code: 'AE' },
        { name: 'Material de arte', code: 'MA' },
        { name: 'Papelería escolar', code: 'PE' },
        { name: 'Material de oficina', code: 'MO' }
    ];
  }
  @Output() closeMenu = new EventEmitter<void>();

  goCategory() {
    // console.log(this.selectedCategory);
    if (this.selectedCategory?.name!==undefined) {
      this.router.navigate([`/categoria/${this.selectedCategory?.name}`]);
       //  boton para cerrar menu 
      this.closeMenu.emit()
    }
    
  }
}


interface paises{
  name:string,
  code:string,
}