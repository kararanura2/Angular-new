import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);

  // Real auth state from Firebase
  currentUser$ = user(this.auth);

  signup(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  logout() {
    return from(signOut(this.auth)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.currentUser$.pipe(map(u => !!u));
  }
}
