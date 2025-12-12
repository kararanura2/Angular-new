import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Character } from '../../../services/character';

export const CharactersActions = createActionGroup({
  source: 'Characters',
  events: {
    'Load Characters': props<{ query?: string; page?: number }>(),
    'Load Characters Success': props<{ characters: Character[]; info: any }>(),
    'Load Characters Failure': props<{ error: any }>(),

    'Load Character Details': props<{ id: string }>(),
    'Load Character Details Success': props<{ character: Character }>(),
    'Load Character Details Failure': props<{ error: any }>(),

    'Clear Selected Character': emptyProps(),
  }
});
