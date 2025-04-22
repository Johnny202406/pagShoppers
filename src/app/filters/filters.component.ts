import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { FormsModule } from '@angular/forms';

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
  marcas: any[] = [];
  onlyWithStock: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedMarcas: { [key: string]: boolean } = {};

  constructor(private productoService: GetDataService) {}

  ngOnInit() {
  
      this.marcas = this.productoService.getMarcasConCantidad();
      this.marcas.forEach(marca => {
        this.selectedMarcas[marca.marca] = false;
      });
  
  }

  toggleDetail(index: number) {
    this.openDetails[index] = !this.openDetails[index];
  }

  // This method will update the filters in the service
  onFilterChange() {
    const selectedFilters = {
      conStock: this.onlyWithStock,
      marcas: Object.keys(this.selectedMarcas).filter(marca => this.selectedMarcas[marca]),
      precioMin: this.minPrice,
      precioMax: this.maxPrice,
    };

    this.productoService.setFiltros(selectedFilters); 
  }
}
