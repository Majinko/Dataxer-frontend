import {Action} from '@ngrx/store';
import {Filter} from '../models/filter';

export enum FilterActionsType {
  FILTER_DATA = '[FILTER] Start filter',
  RESET_FILTER = '[FILTER] Rest filter',
}

export class FilteringActions implements Action {
  readonly type = FilterActionsType.FILTER_DATA;

  constructor(public payload: Filter) {
  }
}

export class FilteringReset implements Action {
  readonly type = FilterActionsType.RESET_FILTER;
}

export type Actions = FilteringActions | FilteringReset;
