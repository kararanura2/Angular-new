export interface FavoritesState {
  ids: number[]; // only store IDs
}

export const initialFavoritesState: FavoritesState = {
  ids: []
};
