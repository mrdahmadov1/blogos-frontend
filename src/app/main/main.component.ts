import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  currentUser: any | null = null;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

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
