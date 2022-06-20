import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-new-supplier-dialog',
  templateUrl: './item-new-supplier-dialog.component.html',
  styleUrls: ['./item-new-supplier-dialog.component.scss']
})
export class ItemNewSupplierDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ItemNewSupplierDialogComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      supplier: '',
      itemPrice: this.formBuilder.group({
        wholesalePrice: 0,
        wholesaleTax: 20,
        surcharge: 0,
        price: 0,
        priceTax: 0,
        tax: 20,
        marge: 0
      }),
      currentTo: ''
    });
    if (this.data) {
      this.formGroup.patchValue(this.data.element);
    }
  }

  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  get f() {
    return this.formGroup.controls;
  }
}
