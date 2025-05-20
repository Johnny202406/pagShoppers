import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export interface Categoria {
  id: number;
  nombre: string;
}
export interface Marca{
  id:number;
  nombre:string;
}
export interface Imagenes{
  id:number;
  idproducto:number;
  url:string;
}
export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  detalle: string;
  categoria: Categoria;
  marca: Marca;
  imagenes:Imagenes[];
}
export interface marcas{ 
  marca: string; 
  cantidad: number;
 }
export interface ProductosResponse {
  productos: Producto[];
  totalRecords: number;
  marcas?:marcas[];
}

export interface pedido{
  dni:string,
  contacto:string,
  detalles:detalles[],
}
export interface detalles{
  idproducto:number,
  cantidad:number,
}

export interface estado_pedidos{
  id:number,
  nombre:string
}


export interface DetallePedido {
  id: number;
  producto:Producto;
  precio: number;
  cantidad: number;
  subtotal: number;
  pedido: Pedido;
}

export interface Pedido {
  id: number;
  dni: string;
  contacto: string;
  fecha: string;
  hora: string;
  total: number;
  idestado: number;
  estado: estado_pedidos;
  detalles: DetallePedido[];
}
export interface PedidosResponse {
  pedidos: Pedido[];
  totalRecords: number;
}
export interface MarcasResponse {
  marcas: Marca[];
  totalRecords: number;
}
export interface CategoriasResponse {
  categorias: Categoria[];
  totalRecords: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetDataBaseService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  categorias:Categoria[]=[]

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl+'categorias').pipe(
      tap((data: Categoria[]) => this.setCategoriasCache(data))
    );
  }
  
  setCategoriasCache(value:Categoria[]){
    this.categorias=[...value]
  }
  getCategoriasCache():Categoria[]{
    return this.categorias
  }

  
  marcas:Marca[]=[]

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl+'marcas').pipe(
      tap((data: Marca[]) => this.setCategoriasCache(data))
    );
  }
  
  setMarcasCache(value:Marca[]){
    this.marcas=[...value]
  }
  getMarcasCache():Marca[]{
    return this.marcas
  }

  getProductos(page: number = 1,pageSize: number = 5, search: string = '',  categoryId?: number, brandId?: number): Observable<ProductosResponse> {
    let params: any = {
      page: page,
      pageSize: pageSize,
      search: search
    };
  
    if (categoryId !== undefined && categoryId !== null) {
      params.categoryId = categoryId;
    }
  
    if (brandId !== undefined && brandId !== null) {
      params.brandId = brandId;
    }
  
    return this.http.get<ProductosResponse>(this.apiUrl + 'productos', { params });
  }

  getProducto(param: number) {
    return this.http.get<any>(`${this.apiUrl}productos/one/${param}`);
  }
  getProductoString(param: string) {
    return this.http.get<any>(`${this.apiUrl}productos/oneString/${param}`);
  }

  subirImagenes(idproducto: number, formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}imagenes/${idproducto}/upload`, formData);
  }
  eliminarImagen(id: number) {
    return this.http.delete<any>(`${this.apiUrl}imagenes/${id}/delete`);
  }

  ultimosProductos(length:number){
    return this.http.get<any>(`${this.apiUrl}productos/last/${length}`);
  }
  
  urlBonita(value:string):string{
    return value.toLowerCase().replace(/ /g, '_')
  }

   urlOriginal(value:string):string{
    return value.toUpperCase().replace(/_/g, ' ')
  }

  subirPedidos(pedido:pedido){
    return this.http.post<any>(`${this.apiUrl}pedidos/upload`, pedido);
  }

  getEstadoPedidos(): Observable<estado_pedidos[]> {
    return this.http.get<estado_pedidos[]>(`${this.apiUrl}estado_pedidos`);
  }

  getPedidos(
  page: number = 1,
  pageSize: number = 5,
  dia?: string,
  idestado?: number,
  search?: string
) {
  // Creamos el objeto params
  let params: any = {
    page,
    pageSize,
  };

  // Solo agregamos los parámetros que no sean undefined
  if (dia) {
    params.dia = dia;
  }
  if (idestado !== undefined) {
    params.idestado = idestado;
  }
  if (search) {
    params.search = search;
  }

  // Realizamos la solicitud GET con los parámetros
  return this.http.get<PedidosResponse>(this.apiUrl + 'pedidos', { params });
}


  actualizarPedidos(params: any){

    return this.http.post<any>(this.apiUrl + 'pedidos/actualizar',  params );
  }

  crearProducto(producto:any){
    return this.http.post<any>(`${this.apiUrl}productos/upload`, producto);
  }
  actualizarProducto(id:any,producto:any){
    return this.http.put<any>(`${this.apiUrl}productos/edit/${id}`, producto);

  }

  // MARCAS
  obtenerMarcasEnTabla(page: number = 1,pageSize: number = 5,search?:string){
    let params: any = {
      page,
      pageSize,
    };
    if (search) params.search=search
    return this.http.get<MarcasResponse>(this.apiUrl + 'marcas/tabla', { params});
  }
  crearMarca(marca:any){
    return this.http.post<any>(`${this.apiUrl}marcas/upload`, marca);
  }
  actualizarMarca(id:any,marca:any){
    return this.http.put<any>(`${this.apiUrl}marcas/edit/${id}`, marca);
  }
  
  // CATEGORIAS
  obtenerCategoriasEnTabla(page: number = 1,pageSize: number = 5,search?:string){
    let params: any = {
      page,
      pageSize,
    };
    if (search) params.search=search
    return this.http.get<CategoriasResponse>(this.apiUrl + 'categorias/tabla',  {params});

  }
  crearCategoria(categoria:any){
    return this.http.post<any>(`${this.apiUrl}categorias/upload`, categoria);
  }
  actualizarCategoria(id:any,categoria:any){
    return this.http.put<any>(`${this.apiUrl}categorias/edit/${id}`, categoria);
  }
}

