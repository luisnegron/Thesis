// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { name, email, password, role });
  }

  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user.role === 'administrator';
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload).user;
    }
    return null;
  }

  getUsers(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.baseUrl}/list-users`, { headers });
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}`, user, { headers });
  }

  deactivateUser(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/deactivate/${id}`, {}, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}