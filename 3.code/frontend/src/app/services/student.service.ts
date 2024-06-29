// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getStudentById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createStudent(student: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.baseUrl}`, student, { headers });
  }

  updateStudent(id: string, student: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}`, student, { headers });
  }

  deleteStudent(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  deactivateStudent(id: string): Observable<any> {
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
