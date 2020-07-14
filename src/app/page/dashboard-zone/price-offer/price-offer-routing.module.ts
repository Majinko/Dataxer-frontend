import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PriceOfferComponent} from './price-offer.component';
import {PriceOfferIndexComponent} from './price-offer-index/price-offer-index.component';
import {PriceOfferCreateComponent} from './price-offer-create/price-offer-create.component';
import {PriceOfferEditComponent} from "./price-offer-edit/price-offer-edit.component";

const routes: Routes = [{
  path: '',
  component: PriceOfferComponent,
  children: [
    {
      path: '',
      component: PriceOfferIndexComponent
    },
    {
      path: 'create',
      component: PriceOfferCreateComponent
    },
    {
      path: 'edit/:price_offer_id',
      component: PriceOfferEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceOfferRoutingModule {
}
