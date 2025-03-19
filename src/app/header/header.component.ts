import { Component,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
   categoriasPapeleria:string[] = [
    "Bolígrafos y marcadores",
    "Lápices y portaminas",
    "Carpetas y archivadores",
    "Cuadernos y libretas",
    "Hojas y papeles",
    "Pegamento y adhesivos",
    "Cinta adhesiva",
    "Reglas y escuadras",
    "Tijeras y cortadores",
    "Papel de envolver y regalo",
    "Calculadoras",
    "Estuches y organizadores",
    "Papel de impresora",
    "Pinturas y pinceles",
    "Etiquetas y adhesivos",
    "Suministros para oficina",
    "Sellos y tinta",
    "Accesorios para escritura",
    "Material de arte",
    "Papelería escolar",
    "Material de oficina"
  ];
  
  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (this.categoriasPapeleria.includes(selectedValue) ) {
      this.router.navigate([`/categoria/${selectedValue}`]);
    }
  }

  onClickSearch(event: Event): void {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    const inputElement = (event.target as HTMLElement).querySelector('#default-search') as HTMLInputElement;
    const searchValue = inputElement.value.trim();

    if (searchValue) {
      this.router.navigate([`/busqueda/${searchValue}`]);
    }
  }

  //  boton para abrir carrito 
  @Output() openCart = new EventEmitter<void>();
  openModal(){
    this.openCart.emit()
  }
}