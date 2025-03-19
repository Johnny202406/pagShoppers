import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  socialMedia:object[]=[
    {icon:'facebook',link:''},
    {icon:'twitter',link:''},
    {icon:'instagram',link:''},
    {icon:'youtube',link:''},
    {icon:'whatsapp',link:''},
  ]

  title:string="Shoppers"
  year:number = new Date().getFullYear()
}
