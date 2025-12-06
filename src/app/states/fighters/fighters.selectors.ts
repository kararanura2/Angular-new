// src/app/states/fighters/fighters.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FightersState } from './fighters.state';
import { fightersFeatureKey } from './fighters.reducer';

export const selectFightersState =
  createFeatureSelector<FightersState>(fightersFeatureKey);

// List
export const selectFightersList = createSelector(
  selectFightersState,
  (state) => state.list
);

export const selectFightersListLoading = createSelector(
  selectFightersState,
  (state) => state.loadingList
);

export const selectFightersListError = createSelector(
  selectFightersState,
  (state) => state.listError
);

// Details
export const selectSelectedFighter = createSelector(
  selectFightersState,
  (state) => state.selected
);

export const selectFighterDetailsLoading = createSelector(
  selectFightersState,
  (state) => state.loadingDetails
);

export const selectFighterDetailsError = createSelector(
  selectFightersState,
  (state) => state.detailsError
);
