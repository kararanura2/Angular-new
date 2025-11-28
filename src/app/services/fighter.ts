import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Fighter{
  id: string; // We will extract this from the API object key
  name: string;
  nickname: string;
  wins: string;
  losses: string;
  draws: string;
  category: string; // Weight Division
  imgUrl: string;
  status: string;
}

export interface FighterDetail {
  // Core Fighter Info (also present in the list)
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


@Injectable({
  providedIn: 'root',
})
export class Fighter {
  private http = inject(HttpClient)
  // list all fighters 
  private listUrl = 'https://api.octagon-api.com/fighters';
  // dtails of fighters
  private detailsUrl = 'https://api.octagon-api.com/fighter';


  getFighters(): Observable<Fighter[]>{
    return this.http.get<Record<string, any>>(this.listUrl).pipe(
      map(response => {
        return Object.keys(response).map(key => ({
          id: key, // The slug becomes the ID (e.g., 'islam-makhachev')
          ...response[key] // Spread the rest of the data
        }));
      })
    );
  }

  getFighterById(id: string): Observable<FighterDetail> {
    return this.http.get<FighterDetail>(`${this.detailsUrl}/${id}`);
  }
}
