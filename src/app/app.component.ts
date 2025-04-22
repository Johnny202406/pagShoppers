import { Component } from '@angular/core';
import { RouterOutlet,NavigationEnd,Router } from '@angular/router';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagShoppers';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Regresar al inicio del scroll
      }
    });
  }


}

