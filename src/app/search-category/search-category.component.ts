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
  expandFilterFunc(e:MouseEvent){
    const btn=e.target as HTMLElement
    const parentFilter=btn.parentElement?.parentElement as HTMLElement
    const svgMas=btn.querySelector('.svgMas') as HTMLElement
    const svgMenos=btn.querySelector('.svgMenos') as HTMLElement
    const filterSection=parentFilter.querySelector('#filter-section-mobile-0') as HTMLElement

    if (parentFilter && filterSection && svgMas && svgMenos){
      svgMas.classList.toggle('hidden')
      svgMenos.classList.toggle('hidden')
      filterSection.classList.toggle('hidden')
    }
  }

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
