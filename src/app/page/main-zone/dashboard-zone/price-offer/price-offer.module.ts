import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PriceOfferComponent} from './price-offer.component';
import {PriceOfferRoutingModule} from './price-offer-routing.module';
import {PriceOfferCreateComponent} from './price-offer-create/price-offer-create.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {CoreModule} from '../../../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import {ContactModule} from '../contact/contact.module';
import {ThemeModule} from '../../../../theme/theme.module';
import {PriceOfferEditComponent} from './price-offer-edit/price-offer-edit.component';
import {PriceOfferShowComponent} from './price-offer-show/price-offer-show.component';
import {DashboardModule} from '../dashboard.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { DemandOfferPackComponent } from './components/demand-offer-pack/demand-offer-pack.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SimpleDemandOfferPackComponent } from './components/simple-demand-offer-pack/simple-demand-offer-pack.component';

@NgModule({
  declarations: [
    PriceOfferComponent,
    PriceOfferCreateComponent,
    PriceOfferEditComponent,
    PriceOfferShowComponent,
    DemandOfferPackComponent,
    SimpleDemandOfferPackComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PriceOfferRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ContactModule,
    ThemeModule,
    DashboardModule,
    TranslateModule,
    NgSelectModule,
    MatSlideToggleModule,
  ],
})
export class PriceOfferModule {
}
