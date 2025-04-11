
import { Component, OnInit } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Orders {
  label: string;
  value: string;
}

@Component({
  selector: 'app-sort-products',
  imports: [Select,FormsModule],
  templateUrl: './sort-products.component.html',
  styleUrl: './sort-products.component.css'
})
export class SortProductsComponent implements OnInit {
  
  Orders?: Orders[] | undefined;
  selectedOrder?: Orders | undefined;

  ngOnInit() {
    this.Orders = [
      { label: 'Nombre (A → Z)', value: 'name-asc' },
      { label: 'Nombre (Z → A)', value: 'name-desc' },
      { label: 'Precio (- → +)', value: 'price-asc' },
      { label: 'Precio (+ → -)', value: 'price-desc' },
      { label: 'Más recientes', value: 'date-desc' },
      { label: 'Más antiguos', value: 'date-asc' }
    ];
  }
}
