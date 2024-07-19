import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:3000/results';

  constructor(private http: HttpClient) {}

  getResults(period: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${period}`);
  }

  createResults(results: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, results);
  }
}