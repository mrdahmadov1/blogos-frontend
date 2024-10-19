import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
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

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    const token = this.getToken(); // Function to retrieve the token from cookies
    return new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    });
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

  private getToken(): string | null {
    return this.cookieService.get('jwt'); // Replace 'jwt' with your actual cookie name
  }
}
