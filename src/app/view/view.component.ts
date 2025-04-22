import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarritoComponent } from "../carrito/carrito.component";
import { MenuContentComponent } from "../menu-content/menu-content.component";


@Component({
  selector: 'app-view',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CarritoComponent, MenuContentComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
}
