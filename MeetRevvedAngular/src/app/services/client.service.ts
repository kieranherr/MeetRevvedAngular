import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Client } from 'src/app/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientSerivce {
  private readonly baseAPIUrl = 'https://localhost:7019/api';
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'user_id';
  private readonly emailKey = 'auth_email';

  constructor(private http: HttpClient) {}

  create(user: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseAPIUrl}/clients/create`, user);
  }
  update(user: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseAPIUrl}/clients/update`, user);
  }
  getById(userId: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseAPIUrl}/clients/${userId}`);
  }

 
}
