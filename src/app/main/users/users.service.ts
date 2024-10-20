import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UsersResponse {
  status: string;
  results: number;
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getAllUsers(): Observable<UsersResponse> {
    return this.http
      .get<UsersResponse>(`${this.baseUrl}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Get all users error:', error);
          throw error;
        })
      );
  }

  createUser(user: NewUser): Observable<NewUser> {
    return this.http
      .post<NewUser>(`${this.baseUrl}`, user, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Create user error:', error);
          throw error;
        })
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error(`Get user by ID error: ${id}`, error);
          throw error;
        })
      );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/${id}`, user, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error(`Update user error: ${id}`, error);
          throw error;
        })
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error(`Delete user error: ${id}`, error);
          throw error;
        })
      );
  }
}
