import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { FightersActions } from '../../states/fighters/fighters.actions';
import * as FightersSelectors from '../../states/fighters/fighters.selectors';

@Component({
  selector: 'app-fighter-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fighter-details.html',
  styleUrl: './fighter-details.css',
})
export class FighterDetails implements OnInit {

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  public appRouter = inject(Router);

  fighter$ = this.store.select(FightersSelectors.selectSelectedFighter);
  loading$ = this.store.select(FightersSelectors.selectFighterDetailsLoading);
  error$ = this.store.select(FightersSelectors.selectFighterDetailsError);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.store.dispatch(FightersActions.clearSelectedFighter());
      this.store.dispatch(FightersActions.loadFighterDetails({ id }));
    });
  }

  getDetail(v: string | undefined): string {
    return v && v !== '0' ? v : 'N/A';
  }
}
