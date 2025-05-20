import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buttons-card',
  templateUrl: './buttons-card.component.html',
  styleUrls: ['./buttons-card.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class ButtonsCardComponent {
  @Input() cantidad: number  = 0;
  @Input() stock: number = 0;
  @Output() cantidadCambiada = new EventEmitter<number>();

  update(value?:number) {
    if (value) this.cantidad=this.cantidad+value
    if (this.cantidad<1) this.cantidad=1
    if (this.cantidad>this.stock) this.cantidad=this.stock
    this.cantidadCambiada.emit(this.cantidad);
  }
}
