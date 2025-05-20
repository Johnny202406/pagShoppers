import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { Producto } from 'src/app/get-data-base.service';
import { PaginationComponent } from './pagination/pagination.component';
import { FiltersComponent } from './filters/filters.component';
import { SortProductsComponent } from './sort-products/sort-products.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { CardProductComponent } from "./card-product/card-product.component";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css'],
  imports: [PaginationComponent, FiltersComponent, SortProductsComponent, NavigationComponent, CardProductComponent],
})
export class SearchCategoryComponent implements OnInit {
  productos: Producto[] = [];
  @Input() labelInput: string | undefined;
  label?: string;

  constructor(
    private route: ActivatedRoute,
    private productoService: GetDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.label=this.labelInput||params['id']
       // Llamar al servicio para obtener los productos según la URL
      
    });
  

    // Suscribirse a los productos obtenidos
    this.productoService.productos$.subscribe((response) => {
      this.productos = response;
      
    });
  }
}
