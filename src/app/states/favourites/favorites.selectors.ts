import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteIds = createSelector(
  selectFavoritesState,
  state => state.ids
);

export const isFavorite = (id: number) =>
  createSelector(selectFavoriteIds, ids => ids.includes(id));
