import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,Event, NavigationEnd, RouterEvent,Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ViewComponent } from './view/view.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';

// FLYONUI
import { IStaticMethods } from 'flyonui/flyonui';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,ViewComponent,FooterComponent,CarritoComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagShoppers';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

}

