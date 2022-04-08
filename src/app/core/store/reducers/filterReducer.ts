import {Filter} from '../models/filter';
import {FilterActionsType} from '../actions/filter.actions';
import * as FilteringActions from '../actions/filter.actions';

const initialState: Filter = null;

export function reducer(
  state: Filter = initialState,
  action: FilteringActions.Actions
) {
  switch (action.type) {
    case FilterActionsType.FILTER_DATA:
      return action;
    case FilterActionsType.RESET_FILTER:
      return state;
  }
}
