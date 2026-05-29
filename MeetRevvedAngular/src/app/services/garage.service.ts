import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from 'src/app/models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private readonly baseAPIUrl = 'https://localhost:7019/api/garages';

  constructor(private http: HttpClient) {}

  getByUserId(userId: string): Observable<Garage> {
    return this.http.get<Garage>(`${this.baseAPIUrl}/user/${userId}`);
  }

  getById(id: number): Observable<Garage> {
    return this.http.get<Garage>(`${this.baseAPIUrl}/${id}`);
  }

  create(): Observable<Garage> {
    return this.http.post<Garage>(this.baseAPIUrl, {});
  }

  update(id: number, garage: Garage): Observable<Garage> {
    return this.http.put<Garage>(`${this.baseAPIUrl}/${id}`, garage);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/${id}`);
  }
}
