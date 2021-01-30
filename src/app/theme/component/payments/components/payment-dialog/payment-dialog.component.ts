import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../../../../core/services/payment.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../helper';
import {MessageService} from '../../../../../core/services/message.service';
import {Payment} from '../../../../../core/models/payment';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
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
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class PaymentDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getRestToPay();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      documentId: this.data.documentId,
      documentType: this.data.documentType,
      paymentMethod: 'BANK_PAYMENT',
      payedDate: [new Date(), Validators.required],
      payedValue: [null, Validators.required]
    });
  }

  private getRestToPay() {
    this.paymentService.restToPay(this.data.documentId, this.data.documentType).subscribe(r => {
      this.formGroup.patchValue({
        payedValue: r
      });
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.paymentService.store(this.formGroup.value).subscribe((payment) => {
      this.dialogRef.close();
      this.paymentService.newPayment.next(payment);
      this.messageService.add('Úhrada bola uložená');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
