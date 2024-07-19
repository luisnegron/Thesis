import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:3000/areas'; // Cambia la URL según tu API

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createArea(area: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, area);
  }

  updateArea(id: string, area: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, area);
  }

  deleteArea(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
