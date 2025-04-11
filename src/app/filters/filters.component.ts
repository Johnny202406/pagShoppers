import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  visibleMovil:boolean=false
  
  filters:any[]=[1,2,3]
  
  openDetails: boolean[] = [];

  toggleDetail(index: number) {
    this.openDetails[index] = !this.openDetails[index];
  }
}
