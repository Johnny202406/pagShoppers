import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './data-example';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private allProducts: Producto[] = []; // Se establece desde fuera

  private filtrosSubject = new BehaviorSubject<any>({});
  private ordenSubject = new BehaviorSubject<string | null>(null);
  private paginaSubject = new BehaviorSubject<number>(1);
  private pageSize:number = 4;

  filtros$ = this.filtrosSubject.asObservable();
  orden$ = this.ordenSubject.asObservable();
  pagina$ = this.paginaSubject.asObservable();
  
  setPageSize(value:number){
    this.pageSize=value
  }

  // ✅ Método para establecer los datos base (desde SearchCategoryComponent)
  setData(data: Producto[]) {
    this.allProducts = data;
    this.setPagina(1); // Reiniciar a la página 1 cuando cambie la data
  }

  // ✅ Observable de productos paginados y filtrados
  productos$ = combineLatest([
    this.filtros$,
    this.orden$,
    this.pagina$
  ]).pipe(
    map(([filtros, orden, pagina]) => {
      let data = [...this.allProducts];

      data = this.applyFilters(data, filtros);
      data = this.applyOrder(data, orden);

      return this.paginate(data, pagina, this.pageSize);
    })
  );

  // ✅ Total de productos filtrados (para paginación)
  totalFiltrados$ = combineLatest([this.filtros$, this.orden$]).pipe(
    map(([filtros, orden]) => {
      let data = [...this.allProducts];

      data = this.applyFilters(data, filtros);
      data = this.applyOrder(data, orden);

      return data.length;
    })
  );

  // Métodos para actualizar estado
  setFiltros(filtros: any) {
    this.filtrosSubject.next(filtros);
    this.setPagina(1); // Reiniciar página
  }

  setOrden(orden: string | null) {
    this.ordenSubject.next(orden);
    this.setPagina(1); // Reiniciar página
  }

  setPagina(pagina: number) {
    this.paginaSubject.next(pagina);
  }

  // Métodos internos
  applyFilters(data: Producto[], filtros: any): Producto[] {
    const {
      conStock = false,
      marcas = [],
      precioMin = 0,
      precioMax = Infinity
    } = filtros;

    return data.filter(p =>
      (!conStock || p.stock > 0) &&
      (marcas.length === 0 || marcas.includes(p.marca)) &&
      p.precio >= precioMin &&
      p.precio <= precioMax
    );
  }

  applyOrder(data: Producto[], criterio: string | null): Producto[] {
    if (!criterio) return data;

    const sorted = [...data];
    switch (criterio) {
      case 'name-asc': return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'name-desc': return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
      case 'price-asc': return sorted.sort((a, b) => a.precio - b.precio);
      case 'price-desc': return sorted.sort((a, b) => b.precio - a.precio);
      case 'date-asc': return sorted.sort((a, b) => a.id - b.id);
      case 'date-desc': return sorted.sort((a, b) => b.id - a.id);
      default: return sorted;
    }
  }

  paginate(data: Producto[], page: number, pageSize: number): Producto[] {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }

  // Obtener producto único (opcional)
  getOneProduct(nombre: string): Producto | null {
    return this.allProducts.find(p =>
      p.nombre.toLowerCase().replace(/ /g, '-') === nombre
    ) || null;
  }

  // Obtener marcas con cantidad (para filtros)
  getMarcasConCantidad(): { marca: string; cantidad: number }[] {
    const marcas = this.allProducts.reduce((acc, producto) => {
      acc[producto.marca] = acc[producto.marca] || { marca: producto.marca, cantidad: 0 };
      acc[producto.marca].cantidad++;
      return acc;
    }, {} as Record<string, { marca: string; cantidad: number }>);

    return Object.values(marcas);
  }
}
