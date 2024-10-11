import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endPoint = "http://localhost:8080/api/users";
  private usersSubject = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) { }

  create(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'  
    });

    // Convertimos los datos del objeto bicicleta en formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.append("identification", user.identification);
    body.append("name", user.name);
    body.append("surname1", user.surname1);
    body.append("surname2", user.surname2);
    body.append("email", user.email);
    body.append("phone", user.phone);
    body.append("address", user.address);
    body.append("password", user.password);


    // Realizamos la petición POST y devolvemos un observable con la respuesta
    return this.httpClient.post(this.endPoint, body.toString(), { headers }).pipe(
      tap(() => this.getUsers().subscribe()) // Vuelve a cargar bicicletas después de crear***********
    );
  }

  delete(id: any): Observable<any> {
    // Realizamos la petición DELETE a la URL correspondiente y devolvemos el observable
    return this.httpClient.delete(`${this.endPoint}/${id}`);
  }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endPoint).pipe(
      tap(users => this.usersSubject.next(users)) // Emitir los nuevos datos******************
    );
  }

  // Obtener una bicicleta por su ID
  getUserById(id: any): Observable<any> {
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  update(id: any, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    // Convertimos los nuevos datos en formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.append("identification", user.identification);
    body.append("name", user.name);
    body.append("surname1", user.surname1);
    body.append("surname2", user.surname2);
    body.append("email", user.email);
    body.append("phone", user.phone);
    body.append("address", user.address);
    body.append("password", user.password);
  
    // Realizamos la petición PUT para actualizar el usuario y devolvemos un observable
    return this.httpClient.put(`${this.endPoint}/${id}`, body.toString(), { headers }).pipe(
      tap(() => this.getUsers().subscribe()) // Actualizar la lista después de la actualización
    );
  }
  

  getUsersSubject(): Observable<any[]> {
    return this.usersSubject.asObservable(); // Permitir suscripciones
  }

}