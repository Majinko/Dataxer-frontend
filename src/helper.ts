import {BaseFilter} from './app/core/models/filters/baseFilter';
import {AbstractControl} from '@angular/forms';

// custom date picker formats
export const APP_DATE_FORMATS = {
  locale: 'sk',
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

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

// day in time range
export function timeRange(): { timesForHuman: string; timesForPc: string }[] {
  const x = 5; // minutes interval
  const times: { timesForHuman: string, timesForPc: string }[] = []; // time array
  let tt = 0; // start time

  // loop to increment the time and push results in array
  for (let i = 0; tt < 24 * 60; i++) { // getting hours of day in 0-24 format
    const hh = Math.floor(tt / 60);
    const mm = (tt % 60); // getting minutes of the hour in 0-55 format

    times.push({
      timesForPc: ('' + (hh)).slice(-2) + ':' +  ('0' + mm).slice(-2),
      timesForHuman: ('' + (hh)).slice(-2) + ':' + ('0' + mm).slice(-2)
    });

    tt = tt + x;
  }

  return times;
}

// Check array contains object
export function containsObject(obj, list) {
  let x;
  for (x in list) {
    console.log(list[x]);
    if (list.hasOwnProperty(x) && JSON.stringify(list[x]) === JSON.stringify(obj)) {
      return true;
    }
  }

  return false;
}

/**
 * Sum of array object by key
 * @param data
 * @param key
 */
export function sum(data: any[], key: string): number {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

/**
 * Slug
 * @param str
 */
export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc      ';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

/**
 * To human format
 * @param value
 */
export function numberFormat(value: number): string {
  return Number(value).toLocaleString('es-ES', {minimumFractionDigits: 2});
}

/**
 * Year diff
 * @param d1
 * @param d2
 */
export function yearsDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  return date2.getFullYear() - date1.getFullYear();
}

/**
 * Dif twp month
 * @param d1
 * @param d2
 */
export function monthDiff(d1: Date, d2: Date) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const years = yearsDiff(d1, d2);

  return (years * 12) + (date2.getMonth() - date1.getMonth());
}

/**
 * Vrati zoznam stlcpov ktore su invalid
 * @param checkControls
 */
export function findInvalidControls(checkControls: { [p: string]: AbstractControl }) {
  const invalid = [];
  const controls = checkControls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalid.push(name);
    }
  }
  return invalid;
}

