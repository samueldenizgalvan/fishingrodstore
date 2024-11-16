import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  endPoint = "http://localhost:8080/api/cart";
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) { }

  // Agregar un producto al carrito
  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Datos que se enviarán en el body de la petición
    const body = {
      user_id: userId,
      product_id: productId,
      quantity: quantity
    };

    // Realizar la petición POST para agregar producto al carrito
    return this.httpClient.post(this.endPoint, body, { headers }).pipe(
      tap(() => this.getCartByUser(userId).subscribe()) // Actualizar el carrito después de agregar
    );
  }

  // Obtener el carrito de un usuario por su ID
  getCartByUser(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.endPoint}/${userId}`).pipe(
      tap(cartItems => this.cartSubject.next(cartItems)) // Emitir los nuevos datos del carrito
    );
  }

  // Eliminar un producto del carrito
  removeFromCart(userId: number, productId: number): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/${userId}/${productId}`).pipe(
      tap(() => this.getCartByUser(userId).subscribe()) // Actualizar el carrito después de eliminar el producto
    );
  }

  // Vaciar el carrito de un usuario
  clearCart(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/clear/${userId}`).pipe(
      tap(() => this.getCartByUser(userId).subscribe()) // Actualizar el carrito después de vaciarlo
    );
  }

  // Obtener el BehaviorSubject para suscribirse a cambios en el carrito
  getCartSubject(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }
}
