import {HttpParams} from '@angular/common/http';
import {CustomFile} from './app/core/models/customFile';

export function prepareFilter(filter) {
  let params = new HttpParams();

  for (const key in filter) {
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
  locale: 'sk',
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

// day in time range
export function timeRange(): string[] {
  const x = 5; // minutes interval
  const times: string[] = []; // time array
  let tt = 0; // start time

  // loop to increment the time and push results in array
  for (let i = 0; tt < 24 * 60; i++) { // getting hours of day in 0-24 format
    const hh = Math.floor(tt / 60);
    const mm = (tt % 60); // getting minutes of the hour in 0-55 format

    times[i] = ('0' + (hh)).slice(-2) + ':' + ('0' + mm).slice(-2);
    tt = tt + x;
  }

  return times;
}
