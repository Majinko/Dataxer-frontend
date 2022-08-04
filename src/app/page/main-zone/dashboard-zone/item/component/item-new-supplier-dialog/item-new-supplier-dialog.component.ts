import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../../core/services/message.service';

@Component({
  selector: 'app-item-new-supplier-dialog',
  templateUrl: './item-new-supplier-dialog.component.html',
  styleUrls: ['./item-new-supplier-dialog.component.scss']
})
export class ItemNewSupplierDialogComponent implements OnInit {
  formGroup: FormGroup;
  type: string = '0';
  priceWithDph = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ItemNewSupplierDialogComponent>,
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
        type: this.type,
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
      console.log(this.data);
      setTimeout(() => {
        this.formGroup.get('itemPrice').patchValue(this.data.element);
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
    this.type = value;
    this.formGroup.get('itemPrice').patchValue({type: this.type});
  }
}
