import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {Pack} from '../../../core/models/pack';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {PackService} from '../../../core/services/pack.service';
import {Project} from '../../../core/models/project';
import {DocumentPackHelpers} from '../../../core/class/DocumentPackHelpers';
import {DemandItem} from '../../../core/models/documentItem';

@Component({
  selector: 'app-demand-document-pack',
  templateUrl: './demand-document-pack.component.html',
  styleUrls: ['./demand-document-pack.component.scss'],
  providers: [
    DocumentHelper
  ],
})
export class DemandDocumentPackComponent extends DocumentPackHelpers implements OnInit {
  projects: Project[] = [];
  categories: CategoryItemNode[];

  @Input() demandItem: DemandItem;
  @Input() priceDemand;
  @Input() index: number;

  @Output() formChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    protected formBuilder: FormBuilder,
    private packService: PackService,
    public documentHelper: DocumentHelper,
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({packs: this.formBuilder.array([])});

    this.formGroup.valueChanges.subscribe((value => {
      this.demandItem.packs = value.packs;
      this.priceDemand.price[this.index] = this.documentHelper.price;
      this.priceDemand.totalPrice[this.index] = this.documentHelper.totalPrice;
      this.formChange.emit();
    }));

    this.documentHelper.handlePackChanges(this.f.packs);
    this.preparePack();

    setTimeout(() => {
      if (this.packs) {
        this.formGroup.patchValue({packs: this.packs});
      }
    }, 1);
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
