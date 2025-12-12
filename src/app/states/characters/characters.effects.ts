import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CharacterService } from '../../../services/character';
import { CharactersActions } from './characters.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export class CharactersEffects {
  private actions$ = inject(Actions);
  private service = inject(CharacterService);

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      mergeMap(({ query, page }) =>
        this.service.getCharacters(query, page).pipe(
          map(resp => CharactersActions.loadCharactersSuccess({ characters: resp.results, info: resp.info })),
          catchError(error => of(CharactersActions.loadCharactersFailure({ error })))
        )
      )
    )
  );

  loadCharacterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacterDetails),
      mergeMap(({ id }) =>
        this.service.getCharacterById(id).pipe(
          map(character => {
            if (!character) return CharactersActions.loadCharacterDetailsFailure({ error: 'No data' });
            return CharactersActions.loadCharacterDetailsSuccess({ character });
          }),
          catchError(error => of(CharactersActions.loadCharacterDetailsFailure({ error })))
        )
      )
    )
  );
}
