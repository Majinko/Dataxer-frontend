import {Component, Input, OnInit} from '@angular/core';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {DemandItem} from '../../../../../core/models/documentItem';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Pack} from '../../../../../core/models/pack';

@Component({
  selector: 'app-simple-demand-offer-pack',
  templateUrl: './simple-demand-offer-pack.component.html',
  styleUrls: ['./simple-demand-offer-pack.component.scss'],
})
export class SimpleDemandOfferPackComponent implements OnInit {
  demandPacks: Pack[] = [];
  formGroup: FormGroup;

  @Input() demandPackItem: DemandItem[];
  @Input() simpleDemandPacks;
  @Input() documentHelper: DocumentHelper;

  constructor(
    protected formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({packs: this.formBuilder.array([])});
    if (this.simpleDemandPacks.packs.length > 0) {
      this.demandPacks = [];
      this.demandPacks = this.simpleDemandPacks.packs;
    } else {
      this.createDemandPack();
    }

    this.formGroup.valueChanges.subscribe((value => {
      this.simpleDemandPacks.packs = value.packs;
    }));
  }

  private createDemandPack(): void {
    this.demandPacks = [];
    this.demandPacks.push({
      id: null,
      title: null,
      customPrice: false,
      showItems: true,
      price: null,
      tax: this.formGroup.value.company?.companyTaxType === 'TAX_PAYER' ? 20 : 0,
      totalPrice: null,
      packItems: []
    });
    this.demandPackItem.forEach( f => {
      const demandItem = JSON.parse(JSON.stringify(f));
      delete demandItem.packs;
      this.demandPacks[0].packItems.push(
        {
          id: null,
          title: f.title,
          item: null,
          demandItem,
          qty: f.qty,
          unit: f.unit,
          discount: 0,
          price: null,
          tax: this.formGroup.value.company?.companyTaxType === 'TAX_PAYER' ? 20 : 0,
          totalPrice: null,
          project: null,
          category: null
        }
      );
    });
  }
}
