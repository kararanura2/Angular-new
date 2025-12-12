import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CharactersActions } from '../../states/characters/characters.actions';
import * as CharactersSelectors from '../../states/characters/characters.selectors';
import { Observable } from 'rxjs';
import { Character } from '../../../services/character';
import { FavoritesStorage } from '../../../services/favorite-storage';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css' 
})
export class CharacterDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  public appRouter = inject(Router);

  character$: Observable<Character | null> = this.store.select(CharactersSelectors.selectSelectedCharacter);
  loading$ = this.store.select(CharactersSelectors.selectCharacterDetailsLoading);
  error$ = this.store.select(CharactersSelectors.selectCharacterDetailsError);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.appRouter.navigate(['/characters']);
        return;
      }
      this.store.dispatch(CharactersActions.clearSelectedCharacter());
      this.store.dispatch(CharactersActions.loadCharacterDetails({ id }));
    });
  }

  safe(v: string | undefined): string {
    return v ?? 'N/A';
  }

  constructor(private favorites: FavoritesStorage) {}

  toggleFavorite(c: Character) {
    if (this.favorites.isFavorite(c.id)) {
      this.favorites.removeFavorite(c.id);
    } else {
      this.favorites.addFavorite(c);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.isFavorite(id);
  }


}
