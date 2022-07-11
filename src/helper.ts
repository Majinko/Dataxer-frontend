import {AbstractControl, FormArray} from '@angular/forms';
import {MatPaginatorIntl} from '@angular/material/paginator';
import * as moment from 'moment';
import {CustomFile} from './app/core/models/customFile';

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

// translate
const transRangeLabel = (page: number, pageSize: number, length: number) => {
  // tslint:disable-next-line:triple-equals
  if (length == 0 || pageSize == 0) {
    return `0 z ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};

// translate for pagination
// tslint:disable-next-line:typedef
export function getTranslatePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Zobrazení na stránku:';
  paginatorIntl.nextPageLabel = 'Staršie';
  paginatorIntl.previousPageLabel = 'Novšie';
  paginatorIntl.lastPageLabel = 'Najstaršie';
  paginatorIntl.firstPageLabel = 'Najnovšie';
  paginatorIntl.getRangeLabel = transRangeLabel;

  return paginatorIntl;
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
  const result = new Date(date);
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
      timesForPc: ('' + (hh)).slice(-2) + ':' + ('0' + mm).slice(-2),
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
export function slugify(str: string): string {
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

/**
 * Kontrola ci aspon jeden attribut z formu je vyplneny
 *
 */
export function checkFormIsNotFill(checkControls: { [p: string]: AbstractControl }): boolean {
  const controls = checkControls;

  for (const name in controls) {
    if (controls[name].value != null) {
      return false;
    }
  }

  return true;
}

/**
 * Get month data from moment object
 * @param momentData
 */
export const getMonthData = (momentData: moment.Moment): string => {
  const date = new Date(momentData.year(), momentData.month(), momentData.date());

  return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
};

// add percent to number
export const addPercent = (value: any, args: any, fractionDigits: number = 2) => {
  const result: any = (parseFloat(value) / 100) * parseFloat(args) + parseFloat(value);

  return !isNaN(result) ? result.toFixed(fractionDigits) : 0;
};

/**
 * Clear form array
 * @param formArray
 */
export const clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

/**
 * DownloadFile
 * @param file
 */
export const downloadFile = (file: CustomFile): void => {
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  };

  const blob = b64toBlob(file.content, file.contentType);
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  const fileName = file.fileName;

  downloadLink.href = blobUrl;
  downloadLink.download = fileName;
  downloadLink.click();

  downloadLink.remove();
};
