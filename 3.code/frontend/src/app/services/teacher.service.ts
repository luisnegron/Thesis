import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getTeacherById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createTeacher(teacher: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.baseUrl}`, teacher, { headers });
  }

  updateTeacher(id: string, teacher: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}`, teacher, { headers });
  }

  deleteTeacher(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  deactivateTeacher(id: string): Observable<any> {
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
