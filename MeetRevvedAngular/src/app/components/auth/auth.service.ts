import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7019/api/account';
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'user_id';
  private readonly emailKey = 'auth_email';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.emailKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeAuth(res: AuthResponse): void {
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.userIdKey, res.userId);
    localStorage.setItem(this.emailKey, res.email);
  }
}
