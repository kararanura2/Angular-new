// src/app/states/fighters/fighters.state.ts
import { Fighter, FighterDetail } from '../../../services/fighter';

export interface FightersState {
  list: Fighter[];
  loadingList: boolean;
  listError: any;

  selected: FighterDetail | null;
  loadingDetails: boolean;
  detailsError: any;
}

export const initialState: FightersState = {
  list: [],
  loadingList: false,
  listError: null,

  selected: null,
  loadingDetails: false,
  detailsError: null
};
