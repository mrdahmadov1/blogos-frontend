import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl =
    'https://blogos-backend-6c6617a4b466.herokuapp.com/api/v1/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getMe(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/me`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Get me error:', error);
          throw error;
        })
      );
  }

  updateMe(data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/updateMe`, data, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Update me error:', error);
          throw error;
        })
      );
  }

  updateMyPassword(data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/updateMyPassword`, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Update my password error:', error);
          throw error;
        })
      );
  }

  deleteMe(): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/deleteMe`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error(`Delete me error:`, error);
          throw error;
        })
      );
  }
}
