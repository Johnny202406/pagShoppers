import { Component, signal } from '@angular/core';
import {Producto} from'../producto';
@Component({
  selector: 'app-tercer-component',
  imports: [],
  templateUrl: './tercer-component.component.html',
  styleUrl: './tercer-component.component.scss'
})
export class TercerComponentComponent {
  variable1="Hola";
  aroon:Producto[]=[
    {id:1, title:"Juanita"},
    {id:2, title:"Rosita"},
    {id:3, title:"Jesusa"},
    {id:4, title:"Nicoll"},
  ]
  
 variable2= signal(false);
 variable3 =this.variable2.set(this.variable2());
prueba={
  color: "variable2()",
  color2:false
 }

color={
  color: 'yellow',
  height: '200px'
}

}
