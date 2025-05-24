import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '@environnments/environment';


@Component({
  selector: 'app-footer',
  imports: [ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  envs=environment
  contacts:any[]=[
    {icon:'at',label:'example@gmail.com',link:'mailto:example@gmail.com'},
    {icon:'map-marker',label:'Jr. 9 de diciembre 352',link:'https://www.google.com/maps/place//@-13.156839,-74.2258568,18z/data=!4m5!1m2!2m1!1s9+de+Diciembre+352,+Ayacucho,+Huamanga!3m1!15sCiY5IGRlIERpY2llbWJyZSAzNTIsIEF5YWN1Y2hvLCBIdWFtYW5nYZIBEGdlb2NvZGVkX2FkZHJlc3PgAQA?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D'}
  ]

  socialMedia:any[]=[
    {icon:'facebook',link:''},
    {icon:'twitter',link:''},
    {icon:'instagram',link:''},
    {icon:'youtube',link:''},
    {icon:'whatsapp',link:this.envs.urlWhatsApp},
  ]

  year:number = new Date().getFullYear()


}
