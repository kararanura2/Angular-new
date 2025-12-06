import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { FighterCard } from '../fighter-card/fighter-card';

import { FightersActions } from '../../states/fighters/fighters.actions';
import * as FightersSelectors from '../../states/fighters/fighters.selectors';

@Component({
  selector: 'app-fighters-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FighterCard],
  templateUrl: './fighters-list.html',
  styleUrl: './fighters-list.css',
})
export class FightersList implements OnInit {

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  searchQuery = '';

  fighters$ = this.store.select(FightersSelectors.selectFightersList);
  loading$ = this.store.select(FightersSelectors.selectFightersListLoading);
  error$ = this.store.select(FightersSelectors.selectFightersListError);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') || '';
      this.searchQuery = q;

      this.store.dispatch(FightersActions.loadFighters({ query: q }));
    });
  }

  onSearchChange(value: string) {
    this.router.navigate([], {
      queryParams: { q: value },
      queryParamsHandling: 'merge',
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/fighters', id]);
  }
}
