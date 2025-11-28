import { Component, inject } from '@angular/core';
import { AuthService, User } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private authService = inject(AuthService);
  
  currentUser$: Observable<User | null> = this.authService.currentUser$;

  onLogout(): void {
    this.authService.logout();
  }
}