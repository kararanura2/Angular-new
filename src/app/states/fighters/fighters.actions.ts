// src/app/states/fighters/fighters.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Fighter, FighterDetail } from '../../../services/fighter';

export const FightersActions = createActionGroup({
  source: 'Fighters',

  events: {
    // Load list
    'Load Fighters': props<{ query?: string }>(),
    'Load Fighters Success': props<{ fighters: Fighter[] }>(),
    'Load Fighters Failure': props<{ error: any }>(),

    // Load details
    'Load Fighter Details': props<{ id: string }>(),
    'Load Fighter Details Success': props<{ fighter: FighterDetail }>(),
    'Load Fighter Details Failure': props<{ error: any }>(),

    // Clear selected fighter
    'Clear Selected Fighter': emptyProps(),
  }
});
