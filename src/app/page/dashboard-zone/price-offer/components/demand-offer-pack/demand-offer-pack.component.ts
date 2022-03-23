import {Component, Input, OnInit } from '@angular/core';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {DemandItem} from '../../../../../core/models/documentItem';

@Component({
  selector: 'app-demand-offer-pack',
  templateUrl: './demand-offer-pack.component.html',
  styleUrls: ['./demand-offer-pack.component.scss']
})
export class DemandOfferPackComponent implements OnInit {
  priceDemand = {
    price: [],
    totalPrice: []
  };
  @Input() documentHelper: DocumentHelper;
  @Input() demandPackItem: DemandItem[];

  constructor() {
  }

  ngOnInit(): void {
  }

  formChange() {
    const price = this.priceDemand.price.reduce((partialSum, a) => partialSum + a, 0);
    const totalPrice = this.priceDemand.totalPrice.reduce((partialSum, a) => partialSum + a, 0);
    this.documentHelper.price = price;
    this.documentHelper.totalPrice = totalPrice;
  }
}
