import { Component, OnChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GetDataBaseService,Categoria ,Marca, Producto,Imagenes, marcas,Estados,Estado} from 'src/app/get-data-base.service';
import { Router } from '@angular/router';
import { TableModule,Table} from 'primeng/table';
import { FloatLabel } from 'primeng/floatlabel';

import { FileUploadModule } from 'primeng/fileupload';
import { PrimeNG } from 'primeng/config';
import { FileUpload } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBar } from 'primeng/progressbar';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { AlertService } from 'src/app/alert.service';
AlertService

@Component({
  selector: 'app-marcas',
  imports: [CheckboxModule,TextareaModule,Dialog,FormsModule,SelectModule,ReactiveFormsModule,InputTextModule,ButtonModule,TableModule,FloatLabel, ButtonModule, BadgeModule, CommonModule,FileUploadModule,ProgressSpinnerModule,],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
  standalone: true,
})
export class MarcasComponent {
   constructor(
    private dbService: GetDataBaseService,
    private alertService: AlertService,

  ) {}
    marcas: Marca[] = [];
    totalRecords: number = 0;
    pageSize:number=5
    currentPage: number = 1;
    @ViewChild('dt') table!: Table;
    inputValue?:string;

    Estados=Estados
    selectedEstado?:Estado

    ngOnInit(){
      this.loadMarcas()
    }
    
search() {
  this.currentPage = 1; // Siempre volver a la primera página en una nueva búsqueda
  if (this.table) {
    this.table.first = 0; // Esto resetea visualmente el paginador
  }
  this.loadMarcas();
}

loadCustomers(event: any) {
  if (event) {
    this.pageSize = event.rows ?? 5;
    this.currentPage = Math.floor((event.first ?? 0) / this.pageSize) + 1;
  }
  this.loadMarcas();
}


loadMarcas() {
  const estado = this.selectedEstado?.value ;
  const search = this.inputValue?.trim() || undefined;
  this.dbService.obtenerMarcasEnTabla(this.currentPage, this.pageSize, search,estado).subscribe((response)=>{
      this.marcas = response.marcas;
      this.totalRecords = response.totalRecords;
    });
}



// PARA EDITAR Y AGREGAR
position:'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'="top"
visibleModal: boolean = false;
marcaId?:number
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
  
  editMarca(marca:Marca){
    this.marcaId=marca.id
    this.miFormulario.patchValue({
      nombre: marca.nombre,
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
    this.marcaId=undefined
    this.miFormulario.reset();
  }

  operacionesMarca() {
  if (this.miFormulario.invalid) {
    this.miFormulario.markAllAsTouched();
    return;
  }

  const formValue = this.miFormulario.value;

  const payload = {
    nombre: formValue.nombre
  };

  const request = this.marcaId
    ? this.dbService.actualizarMarca(this.marcaId, payload)
    : this.dbService.crearMarca(payload);

  request.subscribe({
    next: () => {
      const mensaje = this.marcaId ? 'actualizada' : 'creada';
      this.alertService.show({severity:'success',summary: `Marca ${mensaje}`, detail:`La marca ha sido ${mensaje} correctamente.`});
    },
    error: (error) => {
      const accion = this.marcaId ? 'Actualizar' : 'Crear';
      this.alertService.show({severity:'error', summary:`Error al ${accion} marca`, detail:`Hubo un problema: ${error.message}`});
    },
    complete: () => {
      this.loadMarcas()
      this.showDialog()
    }
  });
}


  // HABILITAR DESHABILITAR
  habilitarDeshabilitar(marca:Marca){
    const nuevoEstado:boolean=!marca.habilitado
    const txt=nuevoEstado?"Habilitado":"Deshabilitado"
    const txt2=nuevoEstado?"Habilitar":"Deshabilitar"
    const severity=nuevoEstado?"success":"info"

    this.dbService.habilitarDeshabilitar("marcas",marca.id,!marca.habilitado).subscribe({
      next: () => {
        this.loadMarcas()
      },
      error: (error) => {
        this.alertService.show({severity:'error', summary:`Error al ${txt2} marca`,detail: `Hubo un problema: ${error.message}`});
      },
      complete: () => {
        this.alertService.show({severity, summary:`Marca: ${marca.nombre}`, detail:`La Marca ha sido ${txt} correctamente.`});
      }
    })
  }
}
