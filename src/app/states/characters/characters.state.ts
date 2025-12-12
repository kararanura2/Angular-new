
import { Character } from '../../../services/character';

export interface CharactersState {
  list: Character[];
  paging: { count: number; pages: number; next: string | null; prev: string | null } | null;
  loadingList: boolean;
  listError: any;

  selected: Character | null;
  loadingDetails: boolean;
  detailsError: any;
}

export const initialState: CharactersState = {
  list: [],
  paging: null,
  loadingList: false,
  listError: null,

  selected: null,
  loadingDetails: false,
  detailsError: null
};
