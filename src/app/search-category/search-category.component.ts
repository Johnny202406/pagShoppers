import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute ,RouterLink} from '@angular/router';
import { CardProductComponent } from '../card-product/card-product.component';
import { productos } from '../data-example';
import { PaginationComponent } from "../pagination/pagination.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { FiltersComponent } from "../filters/filters.component";
import { SortProductsComponent } from "../sort-products/sort-products.component";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css'],
  imports: [CardProductComponent, PaginationComponent, NavigationComponent, FiltersComponent, SortProductsComponent],
  standalone:true,
  
})
export class SearchCategoryComponent implements OnInit {
  productos:any[]=productos

  categoryId: string = '';

  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.categoryId = params['id'] || "Nuevos";
      // Ahora puedes usar categoryId para cargar datos específicos de la categoría
      // console.log(this.categoryId);
    });
  }

  
  

}
