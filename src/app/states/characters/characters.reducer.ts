import { createReducer, on } from '@ngrx/store';
import { CharactersActions } from './characters.actions';
import { initialState } from './characters.state';

export const charactersFeatureKey = 'characters';

export const charactersReducer = createReducer(
  initialState,

  on(CharactersActions.loadCharacters, (state) => ({
    ...state,
    loadingList: true,
    listError: null
  })),

  on(CharactersActions.loadCharactersSuccess, (state, { characters, info }) => ({
    ...state,
    loadingList: false,
    list: characters,
    paging: info
  })),

  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    listError: error
  })),

  on(CharactersActions.loadCharacterDetails, (state) => ({
    ...state,
    loadingDetails: true,
    detailsError: null,
    selected: null
  })),

  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character }) => ({
    ...state,
    loadingDetails: false,
    selected: character
  })),

  on(CharactersActions.loadCharacterDetailsFailure, (state, { error }) => ({
    ...state,
    loadingDetails: false,
    detailsError: error
  })),

  on(CharactersActions.clearSelectedCharacter, (state) => ({
    ...state,
    selected: null
  }))
);
