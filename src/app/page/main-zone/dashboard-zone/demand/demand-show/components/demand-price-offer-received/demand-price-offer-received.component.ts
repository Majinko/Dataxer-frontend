import {Component, Input, OnInit} from '@angular/core';
import {Demand} from '../../../../../../../core/models/demand';

@Component({
  selector: 'app-demand-price-offer-received',
  templateUrl: './demand-price-offer-received.component.html',
  styleUrls: ['./demand-price-offer-received.component.scss']
})
export class DemandPriceOfferReceivedComponent implements OnInit {
  acceptedDemand = [
    {
      title: 'dataid',
      priceOffer: [
        {
          id: 1,
          title: 'CP 01 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'approved',
        },
        {
          id: 2,
          title: 'CP 02 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'waiting',
        },
        {
          id: 3,
          title: 'CP 03 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'rejected',
        }
      ]
    },
    {
      title: 'hmmCompany',
      priceOffer: [
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
      ]
    }
  ];

  @Input() demand: Demand;

  constructor() { }

  ngOnInit(): void {
  }

}
