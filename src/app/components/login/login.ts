import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor() {
    // This now works because currentUser$ is a BehaviorSubject
    if (this.authService.currentUser$.value) {
      this.router.navigate(['/profile']);
    }
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'ENTER CREDENTIALS TO FIGHT';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (error: string) => {
        this.errorMessage = error;
        this.loading = false;
        this.email  = '';
        this.password = '';

      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}