import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl =
    'https://blogos-backend-6c6617a4b466.herokuapp.com/api/v1/users';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotPassword`, data).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Forgot password error:', error);
        throw error;
      })
    );
  }

  resetPassword(data: any, token: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/resetPassword/${token}`, data).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Reset password error:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Logout error:', error);
        throw error;
      })
    );
  }
}
