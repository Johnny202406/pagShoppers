import { Routes } from '@angular/router';
import { SearchCategoryComponent } from './search-category/search-category.component';
import { MainComponent } from './main/main.component';
import { ProductAloneComponent } from './product-alone/product-alone.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ViewComponent } from './view/view.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewAdmin } from './PagesAdmin/adminView.component';
import { DahboardComponent } from './PagesAdmin/pages/dahboard/dahboard.component';
import { SenalesComponent } from './PagesAdmin/pages/senales/senales.component';
import { TercerComponentComponent } from './PagesAdmin/pages/tercer-component/tercer-component.component';
import { AuthGuard } from './guards/auth.guard';


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
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'viewAdmin',component:ViewAdmin,
    canActivate: [AuthGuard],
    children: 
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DahboardComponent },
      { path: 'senales', component: SenalesComponent },
      { path: 'Tercer', component: TercerComponentComponent }
    ]
  },

  { path: '**', component: ErrorPageComponent } 
];



