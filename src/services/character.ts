import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

/** Интерфейсы Rick & Morty */
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string } | null;
  location: { name: string } | null;
  image: string;
  episode: string[];
  url: string;
  created: string; // <-- ЭТО ОТСУТСТВОВАЛО!
}



export interface CharacterListResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
}

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private http = inject(HttpClient);
  private base = 'https://rickandmortyapi.com/api';

  /** Получить список персонажей, поддерживает name (search) и page */
  getCharacters(name?: string, page?: number): Observable<CharacterListResponse> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', `${page}`);

    return this.http.get<CharacterListResponse>(`${this.base}/character`, { params }).pipe(
      catchError(err => {
        // Возвращаем пустой результат в случае ошибки (UI показывает сообщение)
        return of({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
      })
    );
  }

  /** Детали персонажа по id */
  getCharacterById(id: string | number): Observable<Character | null> {
    return this.http.get<Character>(`${this.base}/character/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}
