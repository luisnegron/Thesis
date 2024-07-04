import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = 'http://localhost:3000/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getSubjectById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createSubject(subject: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.baseUrl}`, subject, { headers });
  }

  updateSubject(id: string, subject: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.baseUrl}/${id}`, subject, { headers });
  }

  deleteSubject(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  deactivateSubject(id: string): Observable<any> {
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
