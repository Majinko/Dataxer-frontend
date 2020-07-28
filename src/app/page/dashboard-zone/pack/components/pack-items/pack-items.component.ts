import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PackItem} from "../../../../../core/models/pack";
import {Item} from "../../../../../core/models/item";

@Component({
  selector: 'app-group-items',
  templateUrl: './pack-items.component.html',
  styleUrls: ['./pack-items.component.scss']
})
export class PackItemsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() packItems: PackItem[];
  @Input() isSubmit: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.prepareItems();

    if (this.packItems) {
      this.formGroup.patchValue({items: this.packItems});
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item: ['', Validators.required],
      qty: 0,
    })
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  private prepareItems() {
    for (let i = 0; i < (this.packItems ? this.packItems.length : 1); i++) {
      this.addItem();
    }
  }

  get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  get f() {
    return this.formGroup.controls;
  }


  setItem(item: AbstractControl) {
    if (!item.value.item.title) {
      item.patchValue({
        item: null
      })
    }
  }
}
