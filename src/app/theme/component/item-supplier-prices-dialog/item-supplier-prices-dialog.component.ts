import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../core/services/message.service';

@Component({
  selector: 'app-item-supplier-prices-dialog',
  templateUrl: './item-supplier-prices-dialog.component.html',
  styleUrls: ['./item-supplier-prices-dialog.component.scss']
})
export class ItemSupplierPricesDialogComponent implements OnInit {
  formGroup: FormGroup;
  type: string = '0';
  priceWithDph = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ItemSupplierPricesDialogComponent>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      itemPrice: this.formBuilder.group({
        id: null,
        type: '0',
        priceActualTo: null,
        deliveryTime: null,
        deliveryTimeReserve: null,
        reserve: null,
        supplier: [null, Validators.required],
        wholesalePrice: 0,
        wholesaleTax: 20,
        surcharge: 0,
        price: 0,
        priceTax: 0,
        tax: 20,
        marge: 0,
        discount: 0,
        sellingPrice: 0,
        sellingTax: 20,
        finalMarge: 0,
        profit: 0,
        note: null,
      }),
    });

    if (this.data) {
      setTimeout(() => {
        this.formGroup.get('itemPrice').patchValue(this.data.element);
        if (this.data.element.type) {
          this.type = this.data.element.type;
        } else {
          this.formGroup.get('itemPrice').patchValue({type: '0'});
        }
      }, 1);
    }
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({itemPrice: this.formGroup.get('itemPrice').value});
    } else {
      this.formGroup.markAllAsTouched();
      this.messageService.add('Dodávateľ je povinný údaj.');
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  setType(value: any) {
    this.formGroup.get('itemPrice').patchValue({type: value});
  }
}
