import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private baseUrl = 'http://localhost:3000/sections';
  //private baseUrl1 = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getSections(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getStudents(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getSectionById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createSection(section: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.baseUrl}`, section, { headers });
  }

  updateSection(id: string, section: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}`, section, { headers });
  }

  deactivateSection(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/deactivate/${id}`, {}, { headers });
  }

  getSectionStudents(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/${id}/students`, { headers });
  }

  addStudentsToSection(id: string, studentIds: string[]): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}/add-students`, { studentIds }, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

}
