import { Component,Output,EventEmitter } from '@angular/core';
import { IconCartComponent } from '../icon-cart/icon-cart.component';
import { InputSearchComponent } from "../input-search/input-search.component";
import { SelectCategorieComponent } from "../select-categorie/select-categorie.component";

@Component({
  imports: [IconCartComponent, InputSearchComponent, SelectCategorieComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //  boton para abrir carrito 
  @Output() openCart = new EventEmitter<void>();
  @Output() openMenu = new EventEmitter<void>();
  openModal(){
    this.openCart.emit()
  }
  openMenuContent(){
    this.openMenu.emit()
  }
}