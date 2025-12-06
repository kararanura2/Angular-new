import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  wins: string;
  losses: string;
  draws: string;
  category: string;
  imgUrl: string;
  status: string;
}

export interface FighterDetail {
  category: string;
  draws: string;
  imgUrl: string;
  losses: string;
  name: string;
  nickname: string;
  wins: string;
  status: string;
  placeOfBirth: string;
  trainsAt: string;
  fightingStyle: string;
  age: string;
  height: string;
  weight: string;
  octagonDebut: string;
  reach: string;
  legReach: string;
}

@Injectable({ providedIn: 'root' })
export class FighterService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  getFighters(q?: string) {
    const params: any = {};
    if (q) params.q = q;

    return this.http.get<Fighter[]>(`${this.baseUrl}/fighters`, { params })
      .pipe(
        catchError(() => {
          return of([]);  // <-- offline fallback
        })
      );
  }


  getFighterById(id: string) {
    return this.http.get<FighterDetail>(`${this.baseUrl}/fighter/${id}`)
      .pipe(
        catchError(() => of(null))  // offline fallback
      );
  }
}
