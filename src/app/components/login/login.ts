import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';

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

  onLogin() {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = this.formatError(err.code);
      }
    });
  }

  private formatError(code: string) {
    switch (code) {
      case 'auth/user-not-found': return 'No fighter with this email.';
      case 'auth/wrong-password': return 'Incorrect passcode.';
      case 'auth/invalid-email': return 'Invalid email format.';
      default: return 'Authentication failed. Try again.';
    }
  }
}
