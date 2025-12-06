// src/app/states/fighters/fighters.effects.ts
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FighterService } from '../../../services/fighter';
import { FightersActions } from './fighters.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export class FightersEffects {
  private actions$ = inject(Actions);
  private fighterService = inject(FighterService);

  loadFighters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FightersActions.loadFighters),
      mergeMap(({ query }) =>
        this.fighterService.getFighters(query).pipe(
          map((fighters) =>
            FightersActions.loadFightersSuccess({ fighters })
          ),
          catchError((error) =>
            of(FightersActions.loadFightersFailure({ error }))
          )
        )
      )
    )
  );

    loadFighterDetails$ = createEffect(() =>
    this.actions$.pipe(
        ofType(FightersActions.loadFighterDetails),
        mergeMap(({ id }) =>
        this.fighterService.getFighterById(id).pipe(
            map((fighter) => {
            if (fighter === null) {
                return FightersActions.loadFighterDetailsFailure({
                error: 'No data'
                });
            }
            return FightersActions.loadFighterDetailsSuccess({ fighter });
            }),
            catchError((error) =>
            of(FightersActions.loadFighterDetailsFailure({ error }))
            )
        )
        )
    )
    );

}
