import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      itemPrice: this.formBuilder.group({
        id: null,
        priceActualTo: null,
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
      }),
    });

    if (this.data) {
      this.formGroup.get('itemPrice').patchValue(this.data.element);
    }
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({itemPrice: this.formGroup.get('itemPrice').value});
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  setType(value: any) {
    this.type = value;
  }
}
