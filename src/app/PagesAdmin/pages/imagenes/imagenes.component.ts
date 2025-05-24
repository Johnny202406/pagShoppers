import { Component, OnChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GetDataBaseService,Categoria ,Marca, Producto,Imagenes,Estados,Estado} from 'src/app/get-data-base.service';
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
import { ConfirmService } from 'src/app/confirm.service';


@Component({
  selector: 'app-imagenes',
  imports: [CheckboxModule,TextareaModule,Dialog,FormsModule,SelectModule,ReactiveFormsModule,InputTextModule,ButtonModule,TableModule,FloatLabel,FileUpload, ButtonModule, BadgeModule, ProgressBar, CommonModule,FileUploadModule,ProgressSpinnerModule,ProgressSpinner],
  templateUrl: './imagenes.component.html',
  styleUrl: './imagenes.component.css',
  standalone: true,
})

export class ImagenesComponent {
  constructor(
    private router: Router,
    private dbService: GetDataBaseService,
    private config: PrimeNG, 
    private alertService: AlertService,
    private confirmService: ConfirmService,

  ) {}
 
  Estados=Estados
  selectedEstado?:Estado
  
  @ViewChild('dt') table!: Table;
  inputValue?:string;

  categorias?: Categoria[] ;
  categoriasHabilitadas:Marca[]=[];
  categoriasParaFormulario:Marca[]=[]
  selectedCategory?: Categoria ;

  marcas?: Marca[] ;
  marcasHabilitadas:Marca[]=[];
  marcasParaFormulario:Marca[]=[]
  selectedMarca?: Marca ;
  ngOnInit() {
    this.dbService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.categoriasHabilitadas = this.categorias.filter(m => m.habilitado);
      this.categoriasParaFormulario=[...this.categoriasHabilitadas]
    })
    this.dbService.getMarcas().subscribe((data) => {
      this.marcas = data;
      this.marcasHabilitadas = this.marcas.filter(m => m.habilitado);
      this.marcasParaFormulario=[...this.marcasHabilitadas]
    })
    this.loadProducts()
  }

  products: Producto[] = [];
  totalRecords: number = 0;
  pageSize:number=5
  currentPage: number = 1;

  search() {
    this.currentPage = 1; // Siempre volver a la primera página en una nueva búsqueda
    if (this.table) {
      this.table.first = 0; // Esto resetea visualmente el paginador
    }
    this.loadProducts();
  }

  loadCustomers(event: any) {
    if (event) {
      this.pageSize = event.rows ?? 5;
      this.currentPage = Math.floor((event.first ?? 0) / this.pageSize) + 1;
    }
    this.loadProducts();
  }


  loadProducts() {
    const categoryId = this.selectedCategory ? this.selectedCategory.id : undefined;
    const brandId = this.selectedMarca ? this.selectedMarca.id : undefined;
    const search = this.inputValue || '';
    const estado = this.selectedEstado?.value ;

    this.dbService.getProductos(this.currentPage, this.pageSize, search, categoryId, brandId,estado)
      .subscribe((response) => {
        this.products = response.productos;
        this.totalRecords = response.totalRecords;
      });
  }

// HABILITAR DESHABILITAR
habilitarDeshabilitar(product:Producto){
  const nuevoEstado:boolean=!product.habilitado
  const txt=nuevoEstado?"Habilitado":"Deshabilitado"
  const txt2=nuevoEstado?"Habilitar":"Deshabilitar"
  const severity=nuevoEstado?"success":"info"

  this.dbService.habilitarDeshabilitar("productos",product.id,nuevoEstado).subscribe({
    next: () => {
      this.loadProducts()
    },
    error: (error) => {
      this.alertService.show({severity:'error', summary:`Error al ${txt2} producto`, detail:`Hubo un problema: ${error.message}`});
    },
    complete: () => {
      this.alertService.show({severity, summary:`Producto: ${product.nombre}`, detail:`El producto ha sido ${txt} correctamente.`});
    }
  })
}

// EDITAR PRODUCTOS Y AGREGAR

noSoloEspacios(control: AbstractControl) {
  return control.value?.trim() ? null : { onlySpaces: true };
}

  miFormulario = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      this.noSoloEspacios
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      this.noSoloEspacios
    ]),
    precio: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.min(0)
    ]),
    stock: new FormControl<number | undefined>(undefined, [
      Validators.min(0)
    ]),
    detalle: new FormControl(''), 
    categoria: new FormControl<Categoria | undefined>(undefined, Validators.required),
    marca: new FormControl<Marca | undefined>(undefined, Validators.required), 
  });

  position:'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'="top"
  visibleModal: boolean = false;
  productId?:number

  editProduct(product:Producto){
    this.productId=product.id
    if (!this.marcasHabilitadas.some(m => m.id === product.marca.id)) {
      this.marcasParaFormulario = [product.marca,...this.marcasParaFormulario, ];
    }
    if (!this.categoriasHabilitadas.some(c => c.id === product.categoria.id)) {
      this.categoriasParaFormulario = [product.categoria,...this.categoriasParaFormulario, ];

    }
    this.miFormulario.patchValue({
      codigo:product.codigo,
      nombre: product.nombre,
      precio: product.precio,
      stock: product.stock,
      detalle: product.detalle,
      categoria: product.categoria, 
      marca: product.marca ,     
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
    this.productId=undefined
    this.marcasParaFormulario=[...this.marcasHabilitadas]
    this.categoriasParaFormulario=[...this.categoriasHabilitadas]
    this.miFormulario.reset();
  }

  operacionesProducto() {
  if (this.miFormulario.invalid) {
    this.miFormulario.markAllAsTouched();
    return;
  }

  const formValue = this.miFormulario.value;

  const payload = {
    codigo: formValue.codigo,
    nombre: formValue.nombre,
    precio: formValue.precio,
    stock: formValue.stock,
    detalle: formValue.detalle,
    marcaId: formValue.marca?.id,
    categoriaId: formValue.categoria?.id
  };

  const request = this.productId
    ? this.dbService.actualizarProducto(this.productId, payload)
    : this.dbService.crearProducto(payload);

  request.subscribe({
    next: () => {
      const mensaje = this.productId ? 'actualizado' : 'creado';
      this.alertService.show({severity:'success', summary:`Producto ${mensaje}`, detail:`El producto ha sido ${mensaje} correctamente.`});
    },
    error: (error) => {
      const accion = this.productId ? 'Actualizar' : 'Crear';
      this.alertService.show({severity:'error', summary:`Error al ${accion} producto`, detail:`Hubo un problema: ${error.message}`});
    },
    complete: () => {
      this.loadProducts()
      this.showDialog()
    }
  });
}


  // EDITAR PRODUCTOS Y AGREGAR FIN

  // IMAGENES CRUD
  @ViewChild('fileUploader') fileUploader!: FileUpload;

  files:File[] = [];
  maxFileSize=1000*1000*0.5
  maxFiles:number=4
  productoRefer?:Producto
  spinner:boolean=false
  toogleSpinner(){
    this.spinner=!this.spinner
  }

  verImg(id:number){
    this.toogleSpinner()
    this.dbService.getProducto(id).subscribe({
      next: (response) => {
        this.reset(response)
      },
      error: (error) => {
        this.alertService.show({severity:'error',summary:'Error al ver imagen',detail:`No se puede visualizar las imagenes: ${error.message}`
      });
      },
      complete:()=>{
        this.toogleSpinner()
      }
    });
    
  }
  reset(response:Producto){
    this.productoRefer=response
    this.fileUploader.clear();
    this.files=[]
    console.log(response);
    this.fileUploader.uploadedFiles = [...this.productoRefer.imagenes];
    
  }
  async removeFromCloudinaryAndBd(id: number) {
    if (! await this.confirmService.confirm("¿Está seguro de eliminar la imagen?")) return 

    this.toogleSpinner()
  
    this.dbService.eliminarImagen(id).subscribe({
      next: (response) => {
        this.reset(response)
        this.alertService.show({severity:'info',summary:'Imagen eliminada',detail:'La imagen ha sido eliminada correctamente.'
      });
      },
      error: (error) => {
        this.alertService.show({severity:'error',summary:'Error al eliminar imagen',detail:`Hubo un problema al eliminar la imagen: ${error.message}`
      });
      },
      complete:()=>{
        this.toogleSpinner()
      }
    });
  }
  
    choose(event: any, callback: () => void) {
        callback();
    }

    onRemoveTemplatingFile(event: any, file: File, removeFileCallback: (arg0: any, arg1: any) => void, index: number) {
      removeFileCallback(event, index);
      
      
      this.files =[...this.fileUploader.files]
      this.alertService.show({
        severity:'info', 
        summary:'Imagen removida', 
        detail:'La imagen en memoria ha sido removida con exito.'
      });
  }
  

  onClearTemplatingUpload(clear: () => void) {
    clear();

    this.files = [];
    this.alertService.show({
      severity:'info', 
      summary:'Imagenes removidas.', 
      detail:'Todas las imagenes en memoria han sido removidas.'
    })
}

    onSelectedFiles(event: { files: File[]; currentFiles: File[] }) {
      const remainingSlots = this.maxFiles - this.showProgressBar()[1]
  
      if (remainingSlots <= 0) {
          this.alertService.show({
              severity:'error', 
              summary:'Límite de imágenes', 
              detail:`Máximo permitido: ${this.maxFiles} imágenes.`
          });
          this.fileUploader.files = [...this.files];
          return;
      }
  
      const selectedFiles = event.currentFiles;
  
      // ✅ FILTRAR SOLO ARCHIVOS NUEVOS
      const newFiles = selectedFiles.filter(file => 
          !this.files.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)
      );
  
      let invalidFiles = 0;
      const validFiles = newFiles.filter(file => 
          file.size <= this.maxFileSize ? true : (invalidFiles++, false)
      );
  
      if (invalidFiles > 0) {
          this.alertService.show({
              severity:'error', 
              summary:'Archivo demasiado grande', 
              detail:`Máximo tamaño permitido: ${(this.maxFileSize / (1024 * 1024)).toFixed(2)} MB.`
          });
      }
  
      if (validFiles.length > remainingSlots) {
          this.alertService.show({
              severity:'warn', 
              summary:'Algunas imágenes no se agregaron', 
              detail:`Solo se permiten ${remainingSlots} imágenes más.`
          });
      }
  
      const filesToAdd = validFiles.slice(0, remainingSlots);
  
      // Actualiza la lista de archivos 
      this.files = [...this.files, ...filesToAdd];
  
      this.fileUploader.files = [...this.files];
  }
  
  showProgressBar() :number[]{
      // Aquí recalculamos el progreso de manera correcta
      const totalFiles = this.files.length + this.fileUploader?.uploadedFiles?.length || 0; // Archivos en caché + nube
      const progress = (totalFiles / this.maxFiles) * 100;
  
      // Asegúrate de que el progreso no sea mayor que 100%
      const progressValue = Math.min(progress, 100);
  
      // Actualizar el valor de la barra de progreso
      return [progressValue,totalFiles ] // Aquí se debe actualizar la propiedad que se está utilizando en el HTML
  }
  
 
    async uploadImgs() {

      if (!this.productoRefer) {
        this.alertService.show({severity:'error', summary:'Producto no seleccionado', detail:'No se ha seleccionado un producto para asociar las imágenes.'});
        return;
      }
    
      if (this.files.length === 0) {
        this.alertService.show({severity:'warn', summary:'Sin archivos', detail:'No hay imágenes para subir.'});
        return;
      }
    
      const formData = new FormData();
      
     
      this.files.forEach((file) => {
        formData.append('files', file, file.name);
      });
      this.toogleSpinner()
      

      this.dbService.subirImagenes(this.productoRefer.id, formData).subscribe({
        
        next: (response) => {
          this.reset(response)
          this.alertService.show({severity:'success', summary:'Subida exitosa', detail:'Las imágenes se han subido correctamente.'});
    
        },
        error: (error) => {
          this.alertService.show({severity:'error', summary:'Error al subir imágenes', detail:'Hubo un problema al subir las imágenes.'});
        },
        complete:()=>{
          this.toogleSpinner()
        }
        
      });
    }
 
    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes||[];
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }
    clearCallbackMio() {
      this.files = [];
      this.fileUploader.files = [];
      this.alertService.show({
        severity:'info', 
        summary:'Imagenes removidas.', 
        detail:'Todas las imagenes en memoria han sido removidas.'
      })
    }
  
    

}
