import { Component, OnInit } from '@angular/core';
import { FavoritesStorage } from '../../../services/favorite-storage';
import { Character } from '../../../services/character';
import { CommonModule } from '@angular/common';
import { CharacterCard } from '../character-card/character-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CharacterCard],   // <-- REQUIRED
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  favorites: Character[] = [];

  constructor(private fav: FavoritesStorage) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.favorites = this.fav.getAll();
  }

  remove(id: number) {
    this.fav.removeFavorite(id);
    this.load();
  }
}
