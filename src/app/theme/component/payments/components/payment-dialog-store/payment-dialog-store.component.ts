import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog-store',
  templateUrl: './payment-dialog-store.component.html',
  styleUrls: ['./payment-dialog-store.component.scss']
})
export class PaymentDialogStoreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }
}
