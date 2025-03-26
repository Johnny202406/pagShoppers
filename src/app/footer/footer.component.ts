import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  contacts:any[]=[
    {icon:'at',label:'example@gmail.com',link:'mailto:example@gmail.com'},
    {icon:'map-marker',label:'Jr. 9 de diciembre 234',link:'https://'}
  ]

  socialMedia:any[]=[
    {icon:'facebook',link:''},
    {icon:'twitter',link:''},
    {icon:'instagram',link:''},
    {icon:'youtube',link:''},
    {icon:'whatsapp',link:''},
  ]

  title:string="Shoppers"
  year:number = new Date().getFullYear()


}
