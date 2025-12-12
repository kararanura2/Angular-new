import { createReducer, on } from '@ngrx/store';
import { FavoritesActions } from './favorites.actions';
import { initialFavoritesState } from './favorites.state';

export const favoritesReducer = createReducer(
  initialFavoritesState,

  on(FavoritesActions.toggleFavorite, (state, { id }) => {
    const exists = state.ids.includes(id);

    return {
      ...state,
      ids: exists
        ? state.ids.filter(x => x !== id)
        : [...state.ids, id]
    };
  }),

  on(FavoritesActions.loadFavoritesFromStorage, (state, { ids }) => ({
    ...state,
    ids
  }))
);
