import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {UNITS} from '../../../core/data/unit-items';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {Pack, PackItem} from '../../../core/models/pack';
import {PackService} from '../../../core/services/pack.service';
import {Item} from '../../../core/models/item';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-document-pack',
  templateUrl: './document-pack.component.html',
  styleUrls: ['./document-pack.component.css'],
})
export class DocumentPackComponent implements OnInit {
  units = UNITS;

  @Input() documentId: number;
  @Input() packs: Pack[];
  @Input() documentHelper: DocumentHelper;
  @Input() formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private packService: PackService
  ) {
  }

  ngOnInit() {
    this.documentHelper.handlePackChanges(this.f.packs);
    this.preparePack();

    setTimeout(() => {
      if (this.packs) {
        this.formGroup.patchValue({packs: this.packs});
      }
    }, 1);
  }

  createPack(): FormGroup {
    return this.formBuilder.group({
      id: null,
      title: null,
      customPrice: false,
      showItems: true,
      price: null,
      tax: this.formGroup.value.company.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
      packItems: this.formBuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: null,
      title: null,
      item: null,
      qty: 1,
      unit: this.units[0].unit,
      discount: 0,
      price: null,
      tax: this.formGroup.value.company.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
    });
  }

  private preparePack() {
    for (let i = 0; i < (this.packs ? this.packs.length : 1); i++) {
      this.addPack();

      if (this.packs) {
        for (let j = 0; j < (this.packs[i] ? this.packs[i].packItems.length - 1 : 1); j++) {
          this.addItemByIndex(i);
        }
      }
    }
  }

  addPack() {
    this.formPacks.push(this.createPack());
  }

  addItem() {
    this.items.push(this.createItem());
  }

  addItemByIndex(packIndex: number) {
    this.itemsByIndex(packIndex).push(this.createItem());
  }

  removePack(event: MouseEvent, i: number) {
    event.preventDefault();
    this.formPacks.removeAt(i);
  }

  removeItem(event: MouseEvent, itemId: number, packId: number) {
    event.preventDefault();

    const packItem: PackItem = this.items.at(itemId).value;

    if (packItem.id != null) {
      this.packService.deleteItemFromPack(
        this.documentId,
        packId,
        packItem.id
      ).subscribe();
    }

    this.items.removeAt(itemId);
  }

  itemsByIndex(index: number): FormArray {
    return this.formPacks.at(index).get('packItems') as FormArray;
  }

  get formPacks(): FormArray {
    return this.formGroup.get('packs') as FormArray;
  }

  get items(): FormArray {
    return this.formPacks.at(this.formPacks.length - 1).get('packItems') as FormArray;
  }

  get f() {
    return this.formGroup.controls;
  }

  // set item when find item
  setItem(itemGroup: FormGroup, item: Item) {
    itemGroup.patchValue({
      item,
      title: item.title,
      price: item.itemPrice.price,
      tax: item.itemPrice.tax
    });
  }

  // set item title
  setItemTitle(itemGroup: FormGroup, title: string) {
    itemGroup.patchValue({
      title,
      item: null
    });
  }

  // set pack when find it
  setPack(packIndex: number, packFormGroup: AbstractControl, pack: Pack) {
    this.packService.getById(pack.id).subscribe(p => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < p.packItems.length; i++) {
        if (p.packItems.length > packFormGroup.get('packItems').value.length) {
          this.addItemByIndex(packIndex);
        }

        packFormGroup.patchValue({
          packItems: p.packItems.map(item => {
            item.id = '';
            item.title = item.item.title;
            item.price = item.item.itemPrice.price;

            return item;
          })
        });
      }
    });
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
    const discountInputs = trRow.querySelectorAll('.jsDiscount');

    // tslint:disable-next-line:no-unused-expression
    discountInputs && discountInputs.forEach(discountInput => {
      discountInput.classList.toggle('d-none');
    });

    return false;
  }

  // show hide pack item
  showHidePackItems(index: number) {
    this.documentHelper.packs[index].showItems = !this.documentHelper.packs[index].showItems;
  }
}
