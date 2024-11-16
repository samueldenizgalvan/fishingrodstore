import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPoint = "http://localhost:8080/api/users";
  private usersSubject = new BehaviorSubject<any[]>([]);

  initialized: boolean = false;

  constructor(private httpClient: HttpClient,
    private storage: Storage) { }

  initializedStorage() {
    if (!this.initialized) {
      this.storage.create();
    }
  }

  // Obtener el token del almacenamiento (puedes usar localStorage o algún servicio de auth)
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Token recuperado de localStorage:', token);
    return token;
  }

  // Método para crear las cabeceras con el token
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.error('No se ha encontrado un token en el localStorage');
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    }
  }


  create(user: any): Observable<any> {
    const body = new URLSearchParams();
    body.append("identification", user.identification);
    body.append("name", user.name);
    body.append("surname1", user.surname1);
    body.append("surname2", user.surname2);
    body.append("email", user.email);
    body.append("phone", user.phone);
    body.append("address", user.address);
    body.append("password", user.password);

    return this.httpClient.post(this.endPoint, body.toString(), { headers: this.getHeaders() }).pipe(
      tap(() => this.getUsers().subscribe())
    );
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/${id}`, { headers: this.getHeaders() });
  }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endPoint, { headers: this.getHeaders() }).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  getUserById(id: any): Observable<any> {
    return this.httpClient.get(`${this.endPoint}/${id}`, { headers: this.getHeaders() });
  }

  update(id: any, user: any): Observable<any> {
    const body = new URLSearchParams();
    body.append("identification", user.identification);
    body.append("name", user.name);
    body.append("surname1", user.surname1);
    body.append("surname2", user.surname2);
    body.append("email", user.email);
    body.append("phone", user.phone);
    body.append("address", user.address);
    body.append("password", user.password);

    return this.httpClient.put(`${this.endPoint}/${id}`, body.toString(), { headers: this.getHeaders() }).pipe(
      tap(() => this.getUsers().subscribe())
    );
  }

  getUsersSubject(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  // Método para subir la foto de perfil del usuario
  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // El nombre 'file' debe coincidir con el configurado en el backend

    // Usar las cabeceras de autenticación
    const headers = this.getHeaders().delete('Content-Type'); // Eliminar 'Content-Type' ya que FormData lo establece automáticamente

    return this.httpClient.post(`${this.endPoint}/update-photo`, formData, { headers });
  }

}
