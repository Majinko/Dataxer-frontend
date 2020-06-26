import {HttpParams} from '@angular/common/http';

export function prepareFilter(filter) {
  let params = new HttpParams();

  for (let key in filter) {
    if (filter.hasOwnProperty(key)) {
      if (filter[key] !== null) {
        params = params.set(key, filter[key].toString());
      }
    }
  }

  return params;
}

export function nonUndefined(value) {
  return typeof value !== 'undefined' ? value : null;
}
