import { Component, OnChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GetDataBaseService,Categoria,Estado,Estados} from 'src/app/get-data-base.service';
import { Router } from '@angular/router';
import { TableModule,Table} from 'primeng/table';
import { FloatLabel } from 'primeng/floatlabel';

import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { AlertService } from 'src/app/alert.service';


@Component({
  selector: 'app-categorias',
  imports: [CheckboxModule,TextareaModule,Dialog,FormsModule,SelectModule,ReactiveFormsModule,InputTextModule,ButtonModule,TableModule,FloatLabel, ButtonModule, BadgeModule, CommonModule,FileUploadModule,ProgressSpinnerModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  standalone: true,
})
export class CategoriasComponent {
  constructor(
    private router: Router,
    private dbService: GetDataBaseService,
    private alertService: AlertService,

  ) {}
  categorias: Categoria[] = [];
  totalRecords: number = 0;
  pageSize:number=5
  currentPage: number = 1;
  @ViewChild('dt') table!: Table;
  inputValue?:string;

  Estados=Estados
  selectedEstado?:Estado

    ngOnInit(){
      this.loadCategorias()
    }
    
search() {
  this.currentPage = 1; // Siempre volver a la primera página en una nueva búsqueda
  if (this.table) {
    this.table.first = 0; // Esto resetea visualmente el paginador
  }
  this.loadCategorias();
}

loadCustomers(event: any) {
  if (event) {
    this.pageSize = event.rows ?? 5;
    this.currentPage = Math.floor((event.first ?? 0) / this.pageSize) + 1;
  }
  this.loadCategorias();
}


loadCategorias() {
  const estado = this.selectedEstado?.value ;
  const search = this.inputValue?.trim() || undefined;
  this.dbService.obtenerCategoriasEnTabla(this.currentPage, this.pageSize, search,estado).subscribe((response)=>{
      this.categorias = response.categorias;
      this.totalRecords = response.totalRecords;
    });
}



// PARA EDITAR Y AGREGAR
position:'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'="top"
visibleModal: boolean = false;
categoriaId?:number
noSoloEspacios(control: AbstractControl) {
  return control.value?.trim() ? null : { onlySpaces: true };
}
miFormulario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      this.noSoloEspacios
    ]),
  })
  
  editCategoria(categoria:Categoria){
    this.categoriaId=categoria.id
    this.miFormulario.patchValue({
      nombre: categoria.nombre,
    });
    this.toogleDialog()
  }
  toogleDialog(){
      this.visibleModal = !this.visibleModal;   
  }
  showDialog() {
      this.resetForm()
      this.toogleDialog() 
  }

  resetForm(){
    this.categoriaId=undefined
    this.miFormulario.reset();
  }

  operacionesCategoria() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const formValue = this.miFormulario.value;

    const payload = {
      nombre: formValue.nombre
    };

    const request = this.categoriaId
      ? this.dbService.actualizarCategoria(this.categoriaId, payload)
      : this.dbService.crearCategoria(payload);

    request.subscribe({
      next: () => {
        const mensaje = this.categoriaId ? 'actualizada' : 'creada';
        this.alertService.show({severity:'success', summary:`Categoria ${mensaje}`, detail:`La categoria ha sido ${mensaje} correctamente.`});
      },
      error: (error) => {
        const accion = this.categoriaId ? 'Actualizar' : 'Crear';
        this.alertService.show({severity:'error', summary:`Error al ${accion} categoria`,detail: `Hubo un problema: ${error.message}`});
      },
      complete: () => {
        this.loadCategorias()
        this.showDialog()
      }
    });
  }
 

  // HABILITAR DESHABILITAR
  habilitarDeshabilitar(categoria:Categoria){
    const nuevoEstado:boolean=!categoria.habilitado
    const txt=nuevoEstado?"Habilitado":"Deshabilitado"
    const txt2=nuevoEstado?"Habilitar":"Deshabilitar"
    const severity=nuevoEstado?"success":"info"
    
    this.dbService.habilitarDeshabilitar("categorias",categoria.id,nuevoEstado).subscribe({
      next: () => {
        this.loadCategorias()
      },
      error: (error) => {
        this.alertService.show({severity, summary:`Error al ${txt2} categoria`, detail:`Hubo un problema: ${error.message}`});
      },
      complete: () => {
         
        this.alertService.show({severity, summary:`Categoria: ${categoria.nombre}`, detail:`La Categoria ha sido ${txt} correctamente.`});
      }
    })
  }
}
