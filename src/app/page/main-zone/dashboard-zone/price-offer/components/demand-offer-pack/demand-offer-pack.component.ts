import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {DemandPackItem, Pack} from '../../../../../../core/models/pack';
import {PriceDocumentBase} from '../../../../../../core/models/documentBase';

@Component({
  selector: 'app-demand-offer-pack',
  templateUrl: './demand-offer-pack.component.html',
  styleUrls: ['./demand-offer-pack.component.scss']
})
export class DemandOfferPackComponent implements OnInit {
  pack: Pack[] = [];
  priceDemand: PriceDocumentBase = {
    price: [],
    totalPrice: []
  };

  @Input() demandPackItems: DemandPackItem[];
  @Input() formGroup: FormGroup;
  @Input() documentHelper: DocumentHelper;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  formChange() {
    this.documentHelper.price = this.priceDemand.price.reduce((partialSum, a) => partialSum + a, 0);
    this.documentHelper.totalPrice = this.priceDemand.totalPrice.reduce((partialSum, a) => partialSum + a, 0);
  }
}
