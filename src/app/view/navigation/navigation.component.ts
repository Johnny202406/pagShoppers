import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  
    categoryId: string = '';
    seccion: string = '';
  

  
    constructor(private route: ActivatedRoute,private router: Router) {}
  
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
    goHome(){
      this.router.navigate(['/'], { queryParams: {}, replaceUrl: true });
    }
  
}
