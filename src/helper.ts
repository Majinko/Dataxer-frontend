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

/**
 * Check value is not undefined
 * @param value
 */
export function nonUndefined(value) {
  return typeof value !== 'undefined' ? value : null;
}

/**
 * Ad days to date
 * @param date
 * @param days
 */
export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


// custom date picker formats
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
