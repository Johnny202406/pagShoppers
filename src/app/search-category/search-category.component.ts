import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, productos } from '../data-example';
import { GetDataService } from '../get-data.service';

import { CardProductComponent } from '../card-product/card-product.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { FiltersComponent } from '../filters/filters.component';
import { SortProductsComponent } from '../sort-products/sort-products.component';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css'],
  imports: [
    CardProductComponent,
    PaginationComponent,
    NavigationComponent,
    FiltersComponent,
    SortProductsComponent
  ],
  standalone: true,
})
export class SearchCategoryComponent implements OnInit {
  productos: Producto[] = productos.slice(20, 30);

  @Input() label: string | undefined;  
  @Input() data: Producto[] | undefined; 

  constructor(
    private route: ActivatedRoute,
    private productoService: GetDataService
  ) {}

  ngOnInit(): void {
    const subset = this.data || this.productos;
    this.productoService.setData(subset);
    this.productoService.productos$.subscribe(productos => {
      this.productos = productos;
    });
  
    this.route.params.subscribe(params => {
      this.label = this.label || params['id'];
    });
  }
  
}
