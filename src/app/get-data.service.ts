import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, Params, NavigationEnd } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Producto,ProductosResponse ,marcas,GetDataBaseService } from './get-data-base.service';


@Injectable({
  providedIn: 'root',
})
export class GetDataService implements OnDestroy {

  private apiUrl = 'http://localhost:3000/productos/cliente';

  // variables de inicio y reset
  private nProductosInicio:number=50

  private pagina:number=1
  private paginacionSize:number=10
  private orden:string|undefined=undefined
  private filtros:any={
    conStock: false,
    marcas: [],
    precioMin: null,
    precioMax: null,
  }

  private paginaSubject = new BehaviorSubject<number>(this.pagina);
  private pageSizeSubject = new BehaviorSubject<number>(this.paginacionSize);
  private ordenSubject = new BehaviorSubject<string|undefined>(this.orden);
  private filtrosSubject = new BehaviorSubject<any>(this.filtros);

  pagina$ = this.paginaSubject.asObservable();
  pageSize$ = this.pageSizeSubject.asObservable();
  orden$ = this.ordenSubject.asObservable();
  filtros$ = this.filtrosSubject.asObservable();

  totalFiltrados$ = new BehaviorSubject<number>(0);
  productos$ = new BehaviorSubject<Producto[]>([]);
  marcas$ = new BehaviorSubject<marcas[]>([]);



  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dbService:GetDataBaseService
  ) {
    merge(
      of(null), // 🔹 Se ejecuta en la carga inicial
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)) // 🔹 Luego en cada navegación
    )
      .pipe(
        switchMap(() => {
          this.resetState();
          const params = this.route.snapshot.queryParams;
          console.log('Cargando productos con', params);
          this.syncParamsFromUrl(params);
          return this.fetchProducts();
        })
      )
      .subscribe();

      // this.route.queryParams
      // .pipe(
      //   switchMap((params: Params) => {
      //     console.log("VAMOS");
          
      //     this.resetState()
      //     this.syncParamsFromUrl(params);
      //     return this.fetchProducts();
      //   })
      // )
      // .subscribe();
  }

  private syncParamsFromUrl(params: any): void {
    const { page,/* pageSize,*/ sort, minPrice, maxPrice, onlyStock, marcas } = params;

    if (page) this.paginaSubject.next(+page);
    // if (pageSize) this.pageSizeSubject.next(+pageSize);
    if (sort) this.ordenSubject.next(sort);
    if (minPrice) this.filtrosSubject.value.precioMin = +minPrice;
    if (maxPrice) this.filtrosSubject.value.precioMax = +maxPrice;
    if (onlyStock) this.filtrosSubject.value.conStock = onlyStock ;
    if (marcas) this.filtrosSubject.value.marcas = marcas.toUpperCase().split(',');

    this.filtrosSubject.next(this.filtrosSubject.value);
  }

  private getSectionParams(): HttpParams {
    let params = new HttpParams()
      .set('page', this.paginaSubject.value.toString())
      .set('pageSize', this.pageSizeSubject.value.toString());
  
    if (this.ordenSubject.value) params = params.set('sort', this.ordenSubject.value);
    const filtros = this.filtrosSubject.value;
    if (filtros.precioMin !== null) params = params.set('minPrice', filtros.precioMin.toString());
    if (filtros.precioMax !== null) params = params.set('maxPrice', filtros.precioMax.toString());
    if (filtros.conStock) params = params.set('onlyStock', filtros.conStock.toString());
    filtros.marcas.forEach((marca: string) => params = params.append('marcas', marca));
  
    const cleanUrl = this.router.url.split('?')[0];
    const urlSegments = cleanUrl.split('/');
    const currentRoute = urlSegments[1] || '';

    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const id = this.dbService.urlOriginal(route.snapshot.params['id']||'');

    if (currentRoute === 'inicio') params = params.set('length', this.nProductosInicio.toString());
    if (currentRoute === 'categoria' && id) params = params.set('categoria', id);
    if (currentRoute === 'busqueda' && id) params = params.set('search', id);
    if (currentRoute === 'producto' && id) params = params.set('productoRefer', id);
    return params
}
  
  

  private fetchProducts(): Observable<any> {
    const params = this.getSectionParams();
    return this.http.get<ProductosResponse>(this.apiUrl, { params }).pipe(
      tap((response) => {
        this.productos$.next(response.productos);
        this.totalFiltrados$.next(response.totalRecords);
        this.marcas$.next(response.marcas||[])
      })
    );
  }



  private resetState(): void {
    this.paginaSubject.next(1); // ← No uses this.pagina, resetea directo
    this.pageSizeSubject.next(10);
    this.ordenSubject.next(undefined);
    this.filtrosSubject.next({
      conStock: false,
      marcas: [],
      precioMin: null,
      precioMax: null,
    }); // ← Crea nuevo objeto, no reuses el de this.filtros
  
    this.productos$.next([]);
    this.marcas$.next([]);
    this.totalFiltrados$.next(0);
  }
  

  setPagina(pagina: number): void {
    // this.paginaSubject.next(pagina);
    const queryParams: any = { page: pagina!==1?pagina:undefined };
    this.updateUrl(queryParams);
  }

  // setPageSize(pageSize: number): void {
  //   this.pageSizeSubject.next(pageSize);
  //   const queryParams: any = { pageSize: pageSize };
  //   this.updateUrl(queryParams);
  // }

  setOrden(orden: string|undefined): void {
    // this.ordenSubject.next(orden);
    const queryParams: any = { sort: orden };
    this.updateUrl(queryParams);
  }

  setFiltros(filtros: any): void {
    // this.filtrosSubject.next(filtros);
    
    const queryParams: any = {
      page: undefined ,
      minPrice: filtros.precioMin ?? undefined,
      maxPrice: filtros.precioMax ?? undefined,
      onlyStock: filtros.conStock ? true : undefined,
      marcas: filtros.marcas?.length ? filtros.marcas.join(',').toLowerCase() : undefined
    };
  
    this.updateUrl(queryParams);
  }
  
  

  private updateUrl(queryParams: any): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  clearAllFilters(){
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: '',
    });
    
  }

  ngOnDestroy(): void {
    this.resetState();
  }
}
