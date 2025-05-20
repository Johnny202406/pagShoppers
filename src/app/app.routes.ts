import { Routes } from '@angular/router';
import { MainComponent } from './view/main/main.component';
import { ProductAloneComponent } from './view/product-alone/product-alone.component';
import { LoginAdminComponent } from './PagesAdmin/components/login-admin/login-admin.component';
import { ViewComponent } from './view/view.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewAdmin } from './PagesAdmin/adminView.component';

import { AuthGuard } from './guards/auth.guard';
import { PedidosComponent } from './PagesAdmin/pages/pedidos/pedidos.component';
import { ImagenesComponent } from './PagesAdmin/pages/imagenes/imagenes.component';
import { environment as envs } from '@environnments/environment';
import { SearchCategoryComponent } from './view/search-category/search-category.component';
import { CategoriasComponent } from './PagesAdmin/pages/categorias/categorias.component';
import { MarcasComponent } from './PagesAdmin/pages/marcas/marcas.component';




export const routes: Routes = [
  { 
    path: '', component: ViewComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
      { path: 'inicio', component: MainComponent }, 
      { path: 'categoria/:id', component: SearchCategoryComponent },
      { path: 'busqueda/:id', component: SearchCategoryComponent },
      { path: 'producto/:id', component: ProductAloneComponent },
    ]
  },
  { path: envs.urlLoginAdmin, component: LoginAdminComponent },
  { path: envs.urlViewAdmin,component:ViewAdmin,
    canActivate: [AuthGuard],
    children: 
    [
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
      { path: 'pedidos', component:  PedidosComponent},
      { path: 'imagenes', component: ImagenesComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'marcas', component: MarcasComponent },
    ]
  },

  { path: '**', component: ErrorPageComponent } 
];



