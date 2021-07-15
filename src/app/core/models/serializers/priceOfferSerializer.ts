import {PriceOffer} from '../priceOffer';

// todo
export class PriceOfferSerializer {
  fromJson(json: any): PriceOffer {
    let priceOffer = new PriceOffer();

    priceOffer = json;

    return priceOffer;
  }

  toJson(mailTemplate: PriceOffer): any {
  }
}
