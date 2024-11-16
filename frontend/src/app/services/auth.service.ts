import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  // Registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Iniciar sesión y almacenar el token en localStorage
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.accessToken && response.userId) {
          console.log('Token recibido:', response.accessToken);
          console.log('User ID recibido:', response.userId);

          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('userId', response.userId.toString());

          console.log('Token almacenado en localStorage:', {
            token: localStorage.getItem('authToken'),
            userId: localStorage.getItem('userId')
          });
          
        } else {
          console.error('No se recibió token o userId en la respuesta');
        }
      })
    );
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null; // Devuelve null si no existe el userId
  }
  
  

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage al cerrar sesión
  }
}
