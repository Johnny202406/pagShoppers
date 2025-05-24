import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarritoComponent } from "./carrito/carrito.component";
import { FooterComponent } from './footer/footer.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { HeaderComponent } from './header/header.component';



@Component({
  selector: 'app-view',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CarritoComponent, MenuContentComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
}
