import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { environment as envs } from '@environnments/environment';


@Component({
  selector: 'app-login-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  constructor(private router: Router) {}
  envs=envs

  password:boolean=false
  changeVisibility() {
    this.password=!this.password
  }

  miFormulario = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  tk:User={
    username:"idlib",
    password:"123"
  }

  loginAdmin(){
    if(this.miFormulario.invalid) return alert("Complete todos los campos.")

    if (localStorage.getItem(envs.tokenPestaña)) return alert("Pestaña Abierta.")

    const username=this.miFormulario.get('username')?.value
    const password=this.miFormulario.get('password')?.value

    if (this.tk.username===username && this.tk.password===password) {
      localStorage.setItem(envs.tokenLogin,envs.tokenLoginValue)

      this.router.navigate([`/${envs.urlViewAdmin}`]);
      return alert("Bienvenido.")
    }

    return alert("No existe.")
  
  }

  cleanLSP(){
    localStorage.removeItem(envs.tokenPestaña)
  }
}
interface User{
  username:string,
  password:string
}