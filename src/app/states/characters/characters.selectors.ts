import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from './characters.state';
import { charactersFeatureKey } from './characters.reducer';

export const selectCharactersState =
  createFeatureSelector<CharactersState>(charactersFeatureKey);

export const selectCharactersList = createSelector(
  selectCharactersState,
  (s) => s.list
);

export const selectCharactersPaging = createSelector(
  selectCharactersState,
  (s) => s.paging
);

export const selectCharactersListLoading = createSelector(
  selectCharactersState,
  (s) => s.loadingList
);

export const selectCharactersListError = createSelector(
  selectCharactersState,
  (s) => s.listError
);

export const selectSelectedCharacter = createSelector(
  selectCharactersState,
  (s) => s.selected
);

export const selectCharacterDetailsLoading = createSelector(
  selectCharactersState,
  (s) => s.loadingDetails
);

export const selectCharacterDetailsError = createSelector(
  selectCharactersState,
  (s) => s.detailsError
);
