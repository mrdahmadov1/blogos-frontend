import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(public router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout Successful', response);
        localStorage.removeItem('user');
        localStorage.setItem('jwt', '');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
