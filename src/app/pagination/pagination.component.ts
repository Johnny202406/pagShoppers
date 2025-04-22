import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent implements OnInit {
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  inputValue: number = 1;

  constructor(private productoService: GetDataService) {}

  ngOnInit(): void {
    this.productoService.setPageSize(this.pageSize)

    // Suscribirse a la página actual
    this.productoService.pagina$.subscribe(page => {
      this.currentPage = page;
      this.inputValue = page;
    });

    // Suscribirse al total filtrado
    this.productoService.totalFiltrados$.subscribe(total => {
      this.totalItems = total;
      this.totalPages = Math.ceil(total / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.productoService.setPagina(page);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }
}
