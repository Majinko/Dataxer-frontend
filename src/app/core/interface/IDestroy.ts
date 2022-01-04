import {Observable} from "rxjs";

export interface IDestroy {
  destroy(id: number): Observable<void>;
}
