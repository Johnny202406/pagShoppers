import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { GetDataBaseService , Categoria} from '../../get-data-base.service';


@Component({
  selector: 'app-select-categorie',
  imports: [FormsModule,SelectModule],
  templateUrl: './select-categorie.component.html',
  styleUrl: './select-categorie.component.css',
  standalone:true,
})


export class SelectCategorieComponent implements OnInit {
  constructor(private router: Router,private dbService: GetDataBaseService) {}

  categorias?: Categoria[] ;
  selectedCategory?: Categoria ;


  ngOnInit() {
    this.dbService.getCategorias().subscribe((data) => {
      this.categorias = data;
    })
    
  }
  @Output() closeMenu = new EventEmitter<void>();

  goCategory() {
    
    if (this.selectedCategory?.nombre!==undefined) {
      this.router.navigate([`/categoria/${this.dbService.urlBonita(this.selectedCategory?.nombre)}`]);
      this.closeMenu.emit()
    }
    
  }
}


