import { Component } from '@angular/core';
import { InputSearchComponent } from "../input-search/input-search.component";
import { SelectCategorieComponent } from "../select-categorie/select-categorie.component";

@Component({
  selector: 'app-menu-content',
  imports: [InputSearchComponent, SelectCategorieComponent],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.css'
})
export class MenuContentComponent {
  visible:boolean=false
}
