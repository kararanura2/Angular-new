import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, delay, catchError, map } from 'rxjs';

// --- MOCK FIREBASE USER STRUCTURE ---
export interface User {
  uid: string;
  email: string;
}

// --- MOCK DATABASE FOR DEMO ---
// Key: email, Value: password
const MOCK_USER_DB = new Map<string, string>(); 
MOCK_USER_DB.set('test@ufc.com', 'password123'); // Pre-registered user for testing

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  // FIX: Expose as BehaviorSubject<User | null> to allow synchronous access to .value in components
  public currentUser$: BehaviorSubject<User | null> = this.currentUserSubject;

  constructor() {
    const storedUser = localStorage.getItem('mock_firebase_user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
  
  private simulateApiCall(callback: () => Observable<any>): Observable<any> {
    return of(null).pipe(
      delay(800), 
      map(() => callback()),
      catchError(error => throwError(() => error))
    );
  }

  // 1. SIGNUP METHOD
  signup(email: string, password: string): Observable<User> {
    return this.simulateApiCall(() => {
      if (MOCK_USER_DB.has(email)) {
        throw new Error('auth/email-already-in-use');
      }
      if (password.length < 6) {
        throw new Error('auth/weak-password');
      }
      
      const newUser: User = { uid: `uid-${Date.now()}`, email };
      MOCK_USER_DB.set(email, password);
      
      this.setUserSession(newUser);
      return of(newUser);
    }).pipe(
      map(userObs => userObs),
      catchError(error => throwError(() => this.formatError(error.message)))
    );
  }

  // 2. LOGIN METHOD
  login(email: string, password: string): Observable<User> {
    return this.simulateApiCall(() => {
      const storedPassword = MOCK_USER_DB.get(email);
      
      if (!storedPassword) {
        throw new Error('auth/user-not-found');
      }
      if (storedPassword !== password) {
        throw new Error('auth/wrong-password');
      }
      
      const user: User = { uid: `uid-${email.split('@')[0]}`, email };
      this.setUserSession(user);
      return of(user);
    }).pipe(
      map(userObs => userObs),
      catchError(error => throwError(() => this.formatError(error.message)))
    );
  }

  // 3. LOGOUT METHOD
  logout(): void {
    localStorage.removeItem('mock_firebase_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  private setUserSession(user: User): void {
    localStorage.setItem('mock_firebase_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private formatError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'This email is already registered.';
      case 'auth/weak-password': return 'Password must be at least 6 characters.';
      case 'auth/user-not-found': return 'No user found with this email.';
      case 'auth/wrong-password': return 'Invalid credentials. Please try again.';
      default: return 'An unknown error occurred. Please try again.';
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }
}