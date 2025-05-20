import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetDataService } from 'src/app/get-data.service';
import { Subscription } from 'rxjs';
import { Select } from 'primeng/select';

interface Orders {
  label: string;
  value: string;
}

@Component({
  selector: 'app-sort-products',
  templateUrl: './sort-products.component.html',
  styleUrls: ['./sort-products.component.css'],
  standalone: true,
  imports: [FormsModule,Select],
})
export class SortProductsComponent implements OnInit {
  Orders: Orders[] = [];
  selectedOrder: Orders | undefined;

  constructor(private productoService: GetDataService) {}

  ngOnInit() {
    this.Orders = [
      { label: 'Nombre (A ➔ Z)', value: 'name-asc' },
      { label: 'Nombre (Z ➔ A)', value: 'name-desc' },
      { label: 'Precio (- ➔ +)', value: 'price-asc' },
      { label: 'Precio (+ ➔ -)', value: 'price-desc' },
      { label: 'Más recientes', value: 'date-desc' },
      { label: 'Más antiguos', value: 'date-asc' }
    ];

    this.productoService.orden$.subscribe((orden) => {
      this.selectedOrder = this.Orders.find(order => order.value === orden);
    });
  }


  onOrderChange() {
      this.productoService.setOrden(this.selectedOrder?.value);
  }
}
