import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dahboard',
  imports: [
    MatCardModule, 
    MatIconModule,
    MatButtonModule],
  templateUrl: './dahboard.component.html',
  styleUrl: './dahboard.component.scss'
})
export class DahboardComponent {
  //primer metodo
    counter=0;
    incrementarDecrementar (value:number){
      this.counter+=value
    }
    reset(){
      this.counter=0
    }
//segundo metodo
    counter2=0;
    incrementar(){
      this.counter2++
    }
    decrementar(){
      if (this.counter2==0){
        return
      }
      this.counter2--
    }
    reset2(){
      this.counter2=0
    }

    //tercera forma
    countersignal =signal(0);
    incrementarSignal(valor2:number){
      this.countersignal.update(current=>current+valor2)
    }
    resetSignal(){
      this.countersignal.set(0)
      
    }

    //cuarta manera
    @Input() count5=0;

    add(){
      this.count5++
    }
    reducir(){
      this.count5--
    }
    resetInput(){
      this.count5=0
    }
}
