import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  endPoint = "http://localhost:8080/api/products";
  private productsSubject = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) { }

  // Crear un nuevo producto
  create(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Convertir los datos del producto a formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.append("price", product.price);
    body.append("code", product.code);
    body.append("brand", product.brand);
    body.append("photo_url", product.photo_url || '');
    body.append("color", product.color || '');
    body.append("category", product.category);

    // Realizar la petición POST y devolver un observable con la respuesta
    return this.httpClient.post(this.endPoint, body.toString(), { headers }).pipe(
      tap(() => this.getProducts().subscribe()) // Recargar productos después de crear
    );
  }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endPoint).pipe(
      tap(products => this.productsSubject.next(products)) // Emitir los nuevos datos
    );
  }

  // Obtener un producto por su ID
  getProductById(id: any): Observable<any> {
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  // Filtrar productos por categoría
  getProductsByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.endPoint}/category/${category}`).pipe(
      tap(products => this.productsSubject.next(products)) // Emitir los productos filtrados por categoría
    );
  }

  // Actualizar un producto
  update(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Convertir los nuevos datos del producto a formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.append("price", product.price);
    body.append("code", product.code);
    body.append("brand", product.brand);
    body.append("photo_url", product.photo_url || '');
    body.append("color", product.color || '');
    body.append("category", product.category);

    // Realizar la petición PUT y devolver un observable con la respuesta
    return this.httpClient.put(`${this.endPoint}/${id}`, body.toString(), { headers }).pipe(
      tap(() => this.getProducts().subscribe()) // Actualizar lista después de la modificación
    );
  }

  // Eliminar un producto por su ID
  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/${id}`).pipe(
      tap(() => this.getProducts().subscribe()) // Actualizar lista después de eliminar
    );
  }

  // Eliminar todos los productos
  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.endPoint).pipe(
      tap(() => this.getProducts().subscribe()) // Actualizar lista después de eliminar todo
    );
  }

  // Obtener el BehaviorSubject para suscribirse a cambios en la lista de productos
  getProductsSubject(): Observable<any[]> {
    return this.productsSubject.asObservable();
  }
}
