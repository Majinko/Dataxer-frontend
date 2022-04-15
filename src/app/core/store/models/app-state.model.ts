import {Filter} from './filter';

export interface AppState {
  readonly filterStore: { payload: Filter, type: string };
}
