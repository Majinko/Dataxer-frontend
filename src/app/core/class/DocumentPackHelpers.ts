import { Injectable, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pack } from '../models/pack';
import { UNITS } from '../data/unit-items';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Item } from '../models/item';
import { addPercent } from '../../../helper';

@Injectable()
export abstract class DocumentPackHelpers {
  units = UNITS;
  titleOptions;

  @Input() packs: Pack[];
  @Input() formGroup: FormGroup;

  protected constructor(protected formBuilder: FormBuilder) {
  }

  protected preparePack() {
    for (let i = 0; i < (this.packs ? this.packs.length : 1); i++) {
      this.addPack();

      if (this.packs) {
        for (let j = 0; j < (this.packs[i] ? this.packs[i].packItems.length - 1 : 1); j++) {
          this.addItemByIndex(i);
        }
      }
    }
  }

  createPack(): FormGroup {
    return this.formBuilder.group({
      id: null,
      title: null,
      customPrice: false,
      showItems: true,
      price: null,
      tax: this.formGroup.value.company?.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
      packItems: this.formBuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: null,
      title: [null, Validators.maxLength(255)],
      item: null,
      qty: 1,
      unit: this.units[0].unit,
      discount: 0,
      demandItem: null,
      price: null,
      tax: this.formGroup.value.company?.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
      project: this.formGroup.get('project')?.value ? this.formGroup.get('project').value : null,
      category: this.formGroup.get('category')?.value ? this.formGroup.get('category').value : null
    });
  }

  addItemByIndex(packIndex: number) {
    this.itemsByIndex(packIndex).push(this.createItem());
  }

  itemsByIndex(index: number): FormArray {
    return this.formPacks.at(index).get('packItems') as FormArray;
  }

  addPack() {
    this.formPacks.push(this.createPack());
  }

  setPackData(packIndex: number, packFormGroup: AbstractControl, p: Pack) {
    // first fill pack with empty items
    for (let i = 0; i < p.packItems.length; i++) {
      if (p.packItems.length > packFormGroup.get('packItems').value.length) {
        this.addItemByIndex(packIndex);
      }
    }

    // then sen pack item values
    packFormGroup.patchValue({
      packItems: p.packItems.map(item => {
        item.id = '';
        item.title = item.item.title;
        item.category = item.item.category;
        item.price = item.item.itemPrice.price;
        item.totalPrice = +addPercent(+item.price, +item.item.itemPrice.tax, 2);

        return item;
      })
    }, { emitEvent: true });
  }

  // set item when find item
  setItem(itemGroup: FormGroup, item: Item) {
    let data = '';
    if (this.titleOptions && this.titleOptions.length > 0) {
      this.titleOptions.forEach(f => {
        let title;
        if (item) {
          title = item[f.value];
        }
        if (title) {
          if (typeof (title) !== 'string') {
            title = title?.name;
          }
          if (data) {
            data = data + ' ' + title;
          } else {
            data = title;
          }
        }
      });
    }

    if (!data) {
      data = item.title
    }
    itemGroup.patchValue({
      item,
      title: data,
      price: item.itemPrice.price,
      tax: item.itemPrice.tax,
      category: item.category
    }, { emitEvent: true });
  }

  // set item title
  setItemTitle(itemGroup: FormGroup, title: string) {
    itemGroup.patchValue({
      title,
      item: null
    });
  }

  removePack(event: MouseEvent, i: number) {
    event.preventDefault();
    this.formPacks.removeAt(i);
  }

  removeItem(event: MouseEvent, itemIndex: number, packIndex: number) {
    event.preventDefault();

    const pack: AbstractControl = this.formPacks.at(packIndex);
    const packItem: FormArray = pack.get('packItems') as FormArray;

    packItem.removeAt(itemIndex);
  }

  // sort pack
  dropPack(event: CdkDragDrop<FormArray[]>) {
    moveItemInArray(this.formPacks.controls, event.previousIndex, event.currentIndex);

    this.formPacks.patchValue(this.formPacks.controls);
  }

  // sort item
  dropItem(packIndex: number, event: CdkDragDrop<any[]>) {
    moveItemInArray(this.itemsByIndex(packIndex).controls, event.previousIndex, event.currentIndex);

    this.itemsByIndex(packIndex).patchValue(this.itemsByIndex(packIndex).controls);
  }

  // show discount
  showDiscount(trRow: HTMLTableRowElement) {
    const settingInputs = trRow.querySelectorAll('.jsSettings');
    const discountInputs = trRow.querySelectorAll('.jsDiscount');

    // tslint:disable-next-line:no-unused-expression
    discountInputs && discountInputs.forEach(discountInput => {
      discountInput.classList.toggle('d-none');
    });

    // tslint:disable-next-line:no-unused-expression
    settingInputs && settingInputs.forEach(settingInput => {
      settingInput.classList.add('d-none');
    });
  }

  // show item more options
  showMoreOptions(trRow: HTMLTableRowElement, add: boolean = true) {
    const discountInputs = trRow.querySelectorAll('.jsDiscount');
    const settingInputs = trRow.querySelectorAll('.jsSettings');

    // tslint:disable-next-line:no-unused-expression
    settingInputs && settingInputs.forEach(settingInput => {
      settingInput.classList.toggle('d-none');
    });

    // tslint:disable-next-line:no-unused-expression
    discountInputs && discountInputs.forEach(discountInput => {
      discountInput.classList.add('d-none');
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  get f() {
    return this.formGroup.controls;
  }

  get items(): FormArray {
    return this.formPacks.at(this.formPacks.length - 1).get('packItems') as FormArray;
  }

  get formPacks(): FormArray {
    return this.formGroup.get('packs') as FormArray;
  }
}
