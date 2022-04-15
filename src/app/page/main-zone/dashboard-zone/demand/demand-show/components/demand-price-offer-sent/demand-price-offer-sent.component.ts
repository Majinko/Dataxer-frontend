import {Component, Input, OnInit} from '@angular/core';
import {Demand} from '../../../../../../../core/models/demand';

@Component({
  selector: 'app-demand-price-offer-sent',
  templateUrl: './demand-price-offer-sent.component.html',
  styleUrls: ['./demand-price-offer-sent.component.scss']
})
export class DemandPriceOfferSentComponent implements OnInit {
    priceOffers = [
    {
      id: 1,
      title: 'CP 01 - 2020',
      priceOfferId: 2603,
      date: '1.2.2021',
      state: 'rejected',
    },
    {
      id: 2,
      title: 'CP 02 - 2020',
      priceOfferId: 2603,
      date: '1.2.2021',
      state: 'rejected',
    },
    {
      id: 3,
      title: 'CP 03 - 2020',
      priceOfferId: 2603,
      date: '1.2.2021',
      state: 'waiting',
    }
  ];

  @Input() demand: Demand;

  constructor() { }

  ngOnInit(): void {
  }

}
