import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  
    categoryId: string = '';
    seccion: string = '';
  

  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.route.url.subscribe(url => {
        this.seccion=url[0].path;  
      });
      
      // this.route.params.subscribe(params => {
      //   this.categoryId = params['id'];
      //   // Ahora puedes usar categoryId para cargar datos específicos de la categoría
      //   // console.log(this.categoryId);
      // });
    }
  
}
