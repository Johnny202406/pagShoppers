import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  constructor(private router: Router) {}

  password:boolean=false
  changeVisibility() {
    this.password=!this.password
  }

  miFormulario = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  tk:User={
    username:"pepe",
    password:"123"
  }

  loginAdmin(){
    if(this.miFormulario.invalid) return alert("Complete todos los campos.")

    if (localStorage.getItem('adminOpen')) return alert("Pestaña Abierta.")

    const username=this.miFormulario.get('username')?.value
    const password=this.miFormulario.get('password')?.value

    if (this.tk.username===username && this.tk.password===password) {
      localStorage.setItem('token','Welcome')

      this.router.navigate(['/viewAdmin']);
      return alert("Bienvenido.")
    }

    return alert("No existe.")
  
  }
}
interface User{
  username:string,
  password:string
}