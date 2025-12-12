import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../services/character';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesStorage } from '../../../services/favorite-storage';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css'
})
export class CharacterCard {
  @Input({ required: true }) character!: Character;
  @Output() cardClicked = new EventEmitter<number>();

  viewDetails(): void {
    console.log(`Character clicked: ${this.character.id}`);
    this.cardClicked.emit(this.character.id);
  }

  constructor(private favorites: FavoritesStorage) {}

  toggleFavorite(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  if (this.isFavorite(this.character.id)) {
    this.favorites.removeFavorite(this.character.id);
  } else {
    this.favorites.addFavorite(this.character);
  }
}

  isFavorite(id: number): boolean {
    return this.favorites.isFavorite(id);
  }
}
