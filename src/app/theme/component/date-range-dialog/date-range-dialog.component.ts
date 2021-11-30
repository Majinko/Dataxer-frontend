import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {APP_DATE_FORMATS} from "../../../../helper";
import {DocumentHelper} from "../../../core/class/DocumentHelper";
import {DatePipe} from "@angular/common";

@Component({
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    DocumentHelper,
    DatePipe
  ],
  selector: 'app-date-range-dialog',
  template: `
    <h1 mat-dialog-title>
      Dátum
    </h1>

    <div mat-dialog-content>
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input [formGroup]="range" [rangePicker]="picker">
          <input matStartDate formControlName="start" placeholder="Start date">
          <input matEndDate formControlName="end" placeholder="End date">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>

        <mat-error *ngIf="range.controls.start.hasError('matStartDateInvalid')">Invalid start date</mat-error>
        <mat-error *ngIf="range.controls.end.hasError('matEndDateInvalid')">Invalid end date</mat-error>
      </mat-form-field>
    </div>

    <div mat-dialog-actions class="text-right d-flex justify-content-end mb-0">
      <button mat-button (click)="dialogRef.close(false)">Zatvoriť</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(range.value)">Filtrovať</button>
    </div>`,
})
export class DateRangeDialogComponent {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  constructor(public dialogRef: MatDialogRef<DateRangeDialogComponent>) {
  }
}
