import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../../../helper';
import {DocumentHelper} from '../../../../../../../core/class/DocumentHelper';
import {DatePipe} from '@angular/common';
import {SalaryService} from '../../../../../../../core/services/salary.service';
import {MessageService} from '../../../../../../../core/services/message.service';

@Component({
  selector: 'app-user-salary-dialog',
  templateUrl: './user-salary-dialog.component.html',
  styleUrls: ['./user-salary-dialog.component.scss'],
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
})
export class UserSalaryDialogComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UserSalaryDialogComponent>,
    private salaryService: SalaryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      start: [new Date(), Validators.required],
      price: [0, Validators.required],
      finish: null,
      salaryType: 'HOUR',
      isActive: true,
      user: this.data.user
    });

    if (this.data && this.data.salary) {
      this.formGroup.patchValue(this.data.salary);
    }
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading = true;

    if (this.data.salary) {
      this.salaryService.update(this.formGroup.value).subscribe(r => {
        this.isLoading = false;
        this.messageService.add('Mzda bola aktualizivaná');

      }, error => {
        this.isLoading = false;
        this.messageService.add(error.error.message);
      });
    } else {
      this.salaryService.store(this.formGroup.value).subscribe(r => {
        this.isLoading = false;
        this.messageService.add('Mzda bola vytvorená');

      }, error => {
        this.isLoading = false;
        this.messageService.add(error.error.message);
      });
    }
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
