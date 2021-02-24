import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-price-offer-show',
  templateUrl: './price-offer-show.component.html',
  styleUrls: ['./price-offer-show.component.scss'],
  providers: [DocumentHelper]
})
export class PriceOfferShowComponent implements OnInit {
  documentId: number;
  priceOffer: PriceOffer;

  constructor(
    private route: ActivatedRoute,
    private priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.documentId = +this.route.snapshot.paramMap.get('id');

      this.getById();
    });
  }

  private getById() {
    this.priceOfferService.getById(this.documentId).subscribe(priceOffer => {
      this.priceOffer = priceOffer;

      this.documentHelper.prepareTaxes(priceOffer.packs);
    });
  }
}
