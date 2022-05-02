import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemandComponent} from './demand.component';
import {DemandIndexComponent} from './demand-index/demand-index.component';
import {DemandRoutingModule} from './demand-routing.module';
import {DemandTableComponent} from '../../paginate-zone/demand-table/demand-table.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {DemandCreateComponent} from './demand-create/demand-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../../theme/theme.module';
import {DemandEditComponent} from './demand-edit/demand-edit.component';
import {CoreModule} from '../../../../core/core.module';
import {DemandShowComponent} from './demand-show/demand-show.component';
import {TranslateModule} from '@ngx-translate/core';
import {
  DemandPriceOfferSentComponent
} from './demand-show/components/demand-price-offer-sent/demand-price-offer-sent.component';
import {
  DemandPriceOfferReceivedComponent
} from './demand-show/components/demand-price-offer-received/demand-price-offer-received.component';
import {AvatarModule} from 'ngx-avatar';


@NgModule({
  declarations: [
    DemandComponent,
    DemandIndexComponent,
    DemandTableComponent,
    DemandCreateComponent,
    DemandEditComponent,
    DemandShowComponent,
    DemandPriceOfferSentComponent,
    DemandPriceOfferReceivedComponent
  ],
  imports: [
    CommonModule,
    DemandRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule,
    CoreModule,
    TranslateModule,
    AvatarModule,
  ]
})
export class DemandModule {
}
