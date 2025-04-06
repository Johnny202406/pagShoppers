import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Verificar si hay un token de autenticación
    
    if (!token) {
      // Si no hay token, redirigir al login
      this.router.navigate(['/loginAdmin']);
      return false;
    }
    
    // Verificar si hay otra pestaña activa
    if (localStorage.getItem('adminOpen') === 'true') {
      // Si ya hay otra pestaña activa, redirigir al login
      this.router.navigate(['/loginAdmin']);
      return false;
    } else {
      // Si no hay otra pestaña activa, marcar esta pestaña como abierta
      localStorage.setItem('adminOpen', 'true');

      // Detectar cuando la pestaña se cierra o se recarga para remover el flag
      window.addEventListener('beforeunload', () => {
        localStorage.removeItem('adminOpen');
      });

      return true; // Permitir el acceso a la vista de administración
    }
  }
}
