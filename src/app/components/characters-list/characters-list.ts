import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CharactersActions } from '../../states/characters/characters.actions';
import * as CharactersSelectors from '../../states/characters/characters.selectors';
import { CharacterCard } from '../character-card/character-card';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterCard],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.css'
})
export class CharactersList implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  searchQuery = '';
  page = 1;

  characters$ = this.store.select(CharactersSelectors.selectCharactersList);
  paging$ = this.store.select(CharactersSelectors.selectCharactersPaging);
  loading$ = this.store.select(CharactersSelectors.selectCharactersListLoading);
  error$ = this.store.select(CharactersSelectors.selectCharactersListError);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('q') || '';
      this.page = Number(params.get('page') || 1);

      this.store.dispatch(
        CharactersActions.loadCharacters({
          query: this.searchQuery,
          page: this.page
        })
      );
    });
  }

  onSearchChange(v: string) {
    this.router.navigate([], {
      queryParams: { q: v, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/character', id]);
  }

  nextPage() {
    this.router.navigate([], {
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge'
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.router.navigate([], {
        queryParams: { page: this.page - 1 },
        queryParamsHandling: 'merge'
      });
    }
  }
}
