// services/indicator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private apiUrl = 'http://localhost:3000/indicators'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getIndicators(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getIndicatorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createIndicator(indicator: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, indicator);
  }

  updateIndicator(id: string, indicator: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, indicator);
  }

  deleteIndicator(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}