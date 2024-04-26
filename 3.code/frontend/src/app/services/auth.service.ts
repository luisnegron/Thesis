import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { 
    /*login(datosInicioSesion: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/login`, datosInicioSesion);
    }
  
    register(datosRegistro: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, datosRegistro);
    }*/
  }
}
