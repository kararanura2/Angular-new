import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router' 
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public authService = inject(AuthService);

  logout(): void{
    this.authService.logout();
  }
}
