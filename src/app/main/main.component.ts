import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(
    public router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout Successful', response);
        localStorage.removeItem('user');
        this.cookieService.delete('jwt');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
