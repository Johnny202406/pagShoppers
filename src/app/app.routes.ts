import { Routes } from '@angular/router';
import { SearchCategoryComponent } from './search-category/search-category.component';
import { MainComponent } from './main/main.component';
import { ProductAloneComponent } from './product-alone/product-alone.component';

export const routes: Routes = [
  
  { path:'',component:MainComponent},
  { path: 'categoria/:id', component: SearchCategoryComponent },
  { path: 'busqueda/:id', component: SearchCategoryComponent },
  { path: 'producto/:id', component: ProductAloneComponent },

];

