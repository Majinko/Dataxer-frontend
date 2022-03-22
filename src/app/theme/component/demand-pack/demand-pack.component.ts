import {Component, Input, OnInit} from '@angular/core';
import {Pack} from '../../../core/models/pack';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {PackService} from '../../../core/services/pack.service';
import {Item} from '../../../core/models/item';
import {CategoryService} from '../../../core/services/category.service';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {DocumentPackHelpers} from '../../../core/class/DocumentPackHelpers';

@Component({
  selector: 'app-demand-pack',
  templateUrl: './demand-pack.component.html',
  styleUrls: ['./demand-pack.component.scss']
})
export class DemandPackComponent extends DocumentPackHelpers implements OnInit {
  categories: CategoryItemNode[];

  @Input() documentId: number;
  @Input() packs: Pack[];
  @Input() documentHelper: DocumentHelper;
  @Input() formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    private packService: PackService,
    private categoryService: CategoryService
  ) {
    super(formBuilder);
  }

  ngOnInit() {
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
      showItems: true,
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
      category: null
    });
  }

  // set item when find item
  setItem(itemGroup: FormGroup, item: Item) {
    itemGroup.patchValue({
      item,
      title: item.title,
      price: item.itemPrice.price,
      tax: item.itemPrice.tax,
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
        this.setPackData(packIndex, packFormGroup, p);
      }
    );
  }

  // show hide pack item
  showHidePackItems(index: number) {
    this.documentHelper.packs[index].showItems = !this.documentHelper.packs[index].showItems;
  }
}
