import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {UNITS} from '../../../core/data/unit-items';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {Pack} from '../../../core/models/pack';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PackService} from '../../../core/services/pack.service';
import {CategoryService} from '../../../core/services/category.service';
import {Item} from '../../../core/models/item';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Project} from '../../../core/models/project';

@Component({
  selector: 'app-demand-document-pack',
  templateUrl: './demand-document-pack.component.html',
  styleUrls: ['./demand-document-pack.component.scss'],
  providers: [
    DocumentHelper
  ],
})
export class DemandDocumentPackComponent implements OnInit {
  formGroup: FormGroup;
  units = UNITS;
  packs: Pack[];
  projects: Project[] = [];

  categories: CategoryItemNode[];

  @Input() documentId: number;
  @Input() item;
  @Input() demand;
  @Output() formChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private packService: PackService,
    private categoryService: CategoryService,
    public documentHelper: DocumentHelper,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({packs: this.formBuilder.array([])
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.item.demandPacks = value;
      this.formChange.emit();
    });

    this.documentHelper.handlePackChanges(this.f.packs);
    this.preparePack();
    this.getCategories();

    setTimeout(() => {
      if (this.packs) {
        this.formGroup.patchValue({packs: this.packs});
      }
    }, 1);
  }

  private getCategories() {
    this.categoryService.all(true).subscribe((categories) => {
      this.categories = categories;
    });
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
      title: null,
      item: null,
      qty: 1,
      unit: this.units[0].unit,
      discount: 0,
      price: null,
      tax: this.formGroup.value.company?.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
      project: null,
      category: null
    });
  }

  private preparePack() {
    console.log('pack');
    console.log(this.packs);
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

  removeItem(event: MouseEvent, itemIndex: number, packIndex: number) {
    event.preventDefault();

    const pack: AbstractControl = this.formPacks.at(packIndex);
    const packItem: FormArray = pack.get('packItems') as FormArray;

    packItem.removeAt(itemIndex);
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
      tax: item.itemPrice.tax,
      category: item.category
    }, {emitEvent: false});
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
            item.price = item.item.itemPrice.price;
            item.category = item.item.category;

            return item;
          })
        }, {emitEvent: false});
      }
    );
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

  // show hide pack item
  showHidePackItems(index: number) {
    this.documentHelper.packs[index].showItems = !this.documentHelper.packs[index].showItems;
  }

}
