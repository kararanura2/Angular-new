// src/app/states/fighters/fighters.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { FightersActions } from './fighters.actions';
import { initialState } from './fighters.state';

export const fightersFeatureKey = 'fighters';

export const fightersReducer = createReducer(
  initialState,

  // Load list
  on(FightersActions.loadFighters, (state) => ({
    ...state,
    loadingList: true,
    listError: null
  })),

  on(FightersActions.loadFightersSuccess, (state, { fighters }) => ({
    ...state,
    loadingList: false,
    list: fighters
  })),

  on(FightersActions.loadFightersFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    listError: error
  })),

  // Load details
  on(FightersActions.loadFighterDetails, (state) => ({
    ...state,
    loadingDetails: true,
    detailsError: null,
    selected: null
  })),

  on(FightersActions.loadFighterDetailsSuccess, (state, { fighter }) => ({
    ...state,
    loadingDetails: false,
    selected: fighter
  })),

  on(FightersActions.loadFighterDetailsFailure, (state, { error }) => ({
    ...state,
    loadingDetails: false,
    detailsError: error
  })),

  // Clear selected
  on(FightersActions.clearSelectedFighter, (state) => ({
    ...state,
    selected: null
  }))
);
