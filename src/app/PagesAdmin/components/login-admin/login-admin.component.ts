import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { environment as envs } from '@environnments/environment';

import { GetDataBaseService,Administrador } from 'src/app/get-data-base.service';
import { AlertService } from 'src/app/alert.service';



@Component({
  selector: 'app-login-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
  standalone:true,
})

export class LoginAdminComponent {
  constructor(
    private router: Router, 
    private dbService: GetDataBaseService,
    private alertService: AlertService,
    
  ) {}
  
  envs=envs

  contrasenaView:boolean=false

  noSoloEspacios(control: AbstractControl) {
    return control.value?.trim() ? null : { onlySpaces: true };
  }
  changeVisibility() {
    this.contrasenaView=!this.contrasenaView
  }

  miFormulario = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),this.noSoloEspacios]),
    contrasena: new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),this.noSoloEspacios])
  });
  
 
  loginAdmin(){
    if(this.miFormulario.invalid) return this.alertService.show({severity:'warn', summary:`Datos Incompletos`, detail:`Complete todos los campos.`});

    if (localStorage.getItem(envs.tokenPestaña)) return this.alertService.show({severity:'info', summary:`Pestaña Abierta`, detail:`Pestaña del Administrador abierta en otra ventana, puede usar Limpiar LSP.`});

    const body = {
      username: this.miFormulario.value.username?.trim(),
      contrasena: this.miFormulario.value.contrasena?.trim(),
    };
      
     this.dbService.login(body).subscribe({
      next: (response) => {
        this.alertService.show({severity:'success', summary:`Bienvenido a Shoppers`, detail:`Inicio de sesión correctamente.`});
        localStorage.setItem(envs.tokenLogin,envs.tokenLoginValue)
        return localStorage.setItem(envs.userInfo,JSON.stringify(response))
      },
      error: () => {
        return this.alertService.show({severity:'error', summary:`No Encontrado`, detail:`Hubo un problema, no se encontró ningún administrador.`});
      },
      complete: () => {
        return this.router.navigate([`/${envs.urlViewAdmin}`]);
      }
    })
    return
  }

  cleanLSP(){
    localStorage.removeItem(envs.tokenPestaña)
  }

}
