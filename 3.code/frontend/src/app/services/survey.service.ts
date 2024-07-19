import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:3000/surveys';

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSurvey(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, survey);
  }

  updateSurvey(id: string, survey: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, survey);
  }

  deleteSurvey(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}