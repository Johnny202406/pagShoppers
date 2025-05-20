import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadClasses } from 'primeng/fileupload';
import { combineLatest } from 'rxjs';
import { GetDataService } from 'src/app/get-data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class FiltersComponent implements OnInit {
  visibleMovil: boolean = false;
  openDetails: boolean[] = [];

  // VARIABLES DE FILTROS
  onlyWithStock?: boolean ;
  minPrice?: number ;
  maxPrice?: number ;
  selectedMarcas: { [key: string]: boolean } = {};
  marcas?: any[] ;

  constructor(private productoService: GetDataService) {}

  ngOnInit() {
    combineLatest([
      this.productoService.filtros$,
      this.productoService.marcas$
    ]).subscribe(([filtros, marcas]) => {
      this.onlyWithStock = filtros.conStock;
      this.minPrice = filtros.precioMin;
      this.maxPrice = filtros.precioMax;
  
      this.selectedMarcas = {};
      marcas.forEach((marca) => {
        this.selectedMarcas[marca.marca] = filtros.marcas.includes(marca.marca)
      });

      this.marcas = marcas;
    });
  }

  toggleDetail(index: number) {
    this.openDetails[index] = !this.openDetails[index];
  }

  onFilterChange() {
    const selectedFilters = {
      conStock: this.onlyWithStock,
      marcas: Object.keys(this.selectedMarcas).filter((marca) => this.selectedMarcas[marca]),
      precioMin: this.minPrice,
      precioMax: this.maxPrice,
    };

    this.productoService.setFiltros(selectedFilters);
  }

  clearFilters(){
    this.productoService.clearAllFilters()
  }
}
