import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, Params, NavigationEnd } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Producto,ProductosResponse ,marcas,GetDataBaseService } from './get-data-base.service';
import { environment as envs } from '@environnments/environment';


@Injectable({
  providedIn: 'root',
})
export class GetDataService implements OnDestroy {

  private apiUrl = envs.apiUrl+'productos/cliente';

  private nProductosInicio:number=50


  private paginaSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(10);
  private ordenSubject = new BehaviorSubject<string|undefined>(undefined);
  private filtrosSubject = new BehaviorSubject<any>({
    conStock: false,
    marcas: [],
    precioMin: null,
    precioMax: null,
  });

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
      of(null), 
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)) 
    )
      .pipe(
        switchMap(() => {
          this.resetState();
          const params = this.route.snapshot.queryParams;
          this.syncParamsFromUrl(params);
          return this.fetchProducts();
        })
      )
      .subscribe();

  }

  private syncParamsFromUrl(params: any): void {
    const { pagina, orden, minPrecio, maxPrecio, soloConStock, marcas } = params;

    if (pagina) this.paginaSubject.next(+pagina);
    if (orden) this.ordenSubject.next(orden);
    if (minPrecio) this.filtrosSubject.value.precioMin = +minPrecio;
    if (maxPrecio) this.filtrosSubject.value.precioMax = +maxPrecio;
    if (soloConStock) this.filtrosSubject.value.conStock = soloConStock ;
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
    this.paginaSubject.next(1); 
    this.pageSizeSubject.next(10);
    this.ordenSubject.next(undefined);
    this.filtrosSubject.next({
      conStock: false,
      marcas: [],
      precioMin: null,
      precioMax: null,
    });
  
    this.productos$.next([]);
    this.marcas$.next([]);
    this.totalFiltrados$.next(0);
  }
  

  setPagina(pagina: number): void {
    const queryParams: any = { pagina: pagina!==1?pagina:undefined };
    this.updateUrl(queryParams);
  }

  setOrden(orden: string|undefined): void {
    const queryParams: any = { orden: orden };
    this.updateUrl(queryParams);
  }

  setFiltros(filtros: any): void {
    const queryParams: any = {
      pagina: undefined ,
      minPrecio: filtros.precioMin ?? undefined,
      maxPrecio: filtros.precioMax ?? undefined,
      soloConStock: filtros.conStock ? true : undefined,
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
