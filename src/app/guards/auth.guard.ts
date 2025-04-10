import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment as envs} from '@environnments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const tkLogin = localStorage.getItem(envs.tokenLogin);
    
    if (tkLogin !== envs.tokenLoginValue) {
      this.router.navigate([`/${envs.urlLoginAdmin}`]);
      return false;
    }

    const tkPestaña = localStorage.getItem(envs.tokenPestaña);
    
    if (tkPestaña===envs.tokenPestañaValue) {
      this.router.navigate([`/${envs.urlLoginAdmin}`]);
      return false;
    } else {
      window.addEventListener('beforeunload', () => {
        localStorage.removeItem(envs.tokenPestaña);
      });

      window.addEventListener('storage', (event) => {
        if (event.key === envs.tokenPestaña ) {
          const tkPestaña = localStorage.getItem(envs.tokenPestaña);

          if (tkPestaña !== envs.tokenPestañaValue ) {
            this.router.navigate([`/${envs.urlLoginAdmin}`]);
          }
        }
      });
      localStorage.setItem(envs.tokenPestaña, envs.tokenPestañaValue);

      return true;
    }
  }
}
