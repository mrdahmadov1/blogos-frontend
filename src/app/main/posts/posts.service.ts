import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  user: User;
  title: string;
  content: string;
  createdAt: string;
  id: string;
}

interface PostsResponse {
  status: string;
  results: number;
  data: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl =
    'https://blogos-backend-6c6617a4b466.herokuapp.com/api/v1/posts';

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

  getAllPosts(): Observable<PostsResponse> {
    return this.http
      .get<PostsResponse>(`${this.baseUrl}/all`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Get all posts error:', error);
          throw error;
        })
      );
  }

  createPost(post: Omit<Post, '_id' | 'createdAt'>): Observable<Post> {
    return this.http
      .post<Post>(`${this.baseUrl}`, post, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Create post error:', error);
          throw error;
        })
      );
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error(`Get post by ID error: ${id}`, error);
          throw error;
        })
      );
  }

  updatePost(
    id: string,
    post: Partial<Omit<Post, '_id' | 'createdAt'>>
  ): Observable<Post> {
    return this.http
      .patch<Post>(`${this.baseUrl}/${id}`, post, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error(`Update post error: ${id}`, error);
          throw error;
        })
      );
  }

  deletePost(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error(`Delete post error: ${id}`, error);
          throw error;
        })
      );
  }
}
