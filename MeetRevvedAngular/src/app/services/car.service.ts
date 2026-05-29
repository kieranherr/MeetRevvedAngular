import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { ClientCarListRecord, CarMeetCar } from 'src/app/models/view-models.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly baseAPIUrl = 'https://localhost:7019/api/cars';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseAPIUrl);
  }
  getAllByUser(userId: string): Observable<ClientCarListRecord[]> {
    return this.http.get<ClientCarListRecord[]>(`${this.baseAPIUrl}/user/${userId}`);
  }
  getById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseAPIUrl}/${id}`);
  }

  getByGarage(garageId: number): Observable<ClientCarListRecord[]> {
    return this.http.get<ClientCarListRecord[]>(`${this.baseAPIUrl}/garage/${garageId}`);
  }

  getTopThreeByMeet(meetId: number): Observable<CarMeetCar[]> {
    return this.http.get<CarMeetCar[]>(`${this.baseAPIUrl}/topthree/${meetId}`);
  }

  create(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseAPIUrl}/create`, car);
  }

  update(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseAPIUrl}/${id}`, car);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/${id}`);
  }

  rate(carId: number, newRate: number): Observable<Car> {
    return this.http.post<Car>(`${this.baseAPIUrl}/${carId}/rate`, { newRate });
  }
}
