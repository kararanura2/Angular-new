import { Injectable } from '@angular/core';
import { Character } from './character';  // adjust import

@Injectable({ providedIn: 'root' })
export class FavoritesStorage {
  private key = 'favorites';

  getAll(): Character[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  isFavorite(id: number): boolean {
    return this.getAll().some(c => c.id === id);
  }

  addFavorite(character: Character) {
    const list = this.getAll();
    if (!list.find(c => c.id === character.id)) {
      list.push(character);
      localStorage.setItem(this.key, JSON.stringify(list));
    }
  }

  removeFavorite(id: number) {
    const list = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
