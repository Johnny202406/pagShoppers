import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuComponent } from "./components/menu/menu.component";
import { DOCUMENT } from '@angular/common';
import { environment as envs } from '@environnments/environment';


@Component({
  selector: 'app-view-admin',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MenuComponent
],
  template: `
  <mat-toolbar class="">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
      <mat-icon>menu</mat-icon>
    </button>
    <span class="example-spacer"></span>
    <button mat-icon-button (click)="logout()">
      <mat-icon >
        logout
      </mat-icon>
    </button>
  </mat-toolbar>

  <mat-sidenav-container>
    <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">

      <app-menu [collapsed]="collapsed()"/>

    </mat-sidenav>

    <mat-sidenav-content class="ml-[250px] content bg-gray-200 " [style.margin-left]="sidenavWidth()">
      <router-outlet/>
    </mat-sidenav-content>

  </mat-sidenav-container>

  
  `,
  styles: `
    
    mat-toolbar{
      position:relative;
      box-shadow:var(--mat-sys-level3) ;
    }
    .content{
      padding:24px;
      
    }
    mat-sidenav-container{
      height: calc(100vh - 64px);
    }
    mat-sidenav{
      border-radius:0
    }

    mat-sidenav,
    mat-sidenav-content{
      transition:all 500s ease-in-out;

    }

    .example-spacer {
       flex: 1 1 auto;
    }
   
  `
})
export class ViewAdmin {
  constructor(private router: Router) {}

  collapsed = signal(false);

  sidenavWidth = computed(()=>this.collapsed()?'65px':'250px');

  logout(){
    const isLogout:boolean=confirm("¿Está seguro de cerrar Sesión?");
    if (isLogout) {
      localStorage.removeItem(envs.tokenLogin);
      localStorage.removeItem(envs.tokenPestaña);
      this.router.navigate([`/${envs.urlLoginAdmin}`]);
    }
  }
  

}
