import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,RouterLink} from '@angular/router';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css'],
  imports:[CardProductComponent,RouterLink]
  
})
export class SearchCategoryComponent implements OnInit {
  categoryId: string = '';
  seccion: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.url.subscribe(url => {
        this.seccion=url[0].path;
      });
    
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      // Ahora puedes usar categoryId para cargar datos específicos de la categoría
      console.log(this.categoryId);
    });
  }

}
