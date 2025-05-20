import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetDataService } from 'src/app/get-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  imports:[FormsModule],
})
export class PaginationComponent implements OnInit{
  pageSize: number =10;
  currentPage: number =1;
  inputValue: number=1 ;

  totalItems: number =0;
  totalPages: number =1;

  // Variable para mantener las suscripciones activas
  private subscriptions: Subscription[] = [];

  constructor(private productoService: GetDataService) {}

  ngOnInit(): void {
    const pageSizeSub = this.productoService.pageSize$.subscribe(size => {
      this.pageSize = size;
    });
    this.subscriptions.push(pageSizeSub);
    
    // Suscribirse a la página
    const paginaSubscription = this.productoService.pagina$.subscribe((page) => {
      this.currentPage = page;
      this.inputValue = page;
    });
    this.subscriptions.push(paginaSubscription);

    // Suscribirse al total de productos filtrados
    const totalFiltradosSubscription = this.productoService.totalFiltrados$.subscribe((total) => {
      this.totalItems = total;
      if (this.pageSize) {
        this.totalPages = Math.ceil(total / this.pageSize);
      }
    });
    
  }

  // Cuando el componente se destruye, cancelamos todas las suscripciones
 
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  onPageChange(page: number): void {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.productoService.setPagina(page);
  }

  // onPageSizeChange(size: number): void {
  //   this.pageSize = size;
  //   this.productoService.setPageSize(this.pageSize);
  //   this.onPageChange(1);
  // }

  getStartIndex() {
      return (this.currentPage - 1) * this.pageSize + 1;
    
     
  }

  getEndIndex() {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }
}
