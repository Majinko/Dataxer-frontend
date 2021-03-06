import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PriceOfferComponent} from './price-offer.component';
import {PriceOfferIndexComponent} from './price-offer-index/price-offer-index.component';
import {PriceOfferCreateComponent} from './price-offer-create/price-offer-create.component';
import {PriceOfferEditComponent} from './price-offer-edit/price-offer-edit.component';
import {PriceOfferShowComponent} from './price-offer-show/price-offer-show.component';

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
      path: 'show/:id',
      component: PriceOfferShowComponent
    },
    {
      path: 'edit/:id',
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
