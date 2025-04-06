import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  imports: [ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent {
  constructor(private router: Router) {}
  @Output() closeMenu = new EventEmitter<void>();

  miFormulario = new FormGroup({
    search: new FormControl('') // Campo sin validaciones
  });

  onClickSearch(): void {
      const searchValue=this.miFormulario.value.search?.trim()
  
      if (searchValue) {
        this.router.navigate([`/busqueda/${searchValue}`]);
        this.closeMenu.emit()
        
      }
    }
}
