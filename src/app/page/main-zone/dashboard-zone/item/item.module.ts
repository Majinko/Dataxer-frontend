import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemComponent} from './item.component';
import {ItemRoutingModule} from './item-routing.module';
import {ItemCreateComponent} from './item-create/item-create.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../../theme/theme.module';
import {ContactModule} from '../contact/contact.module';
import {ItemPriceComponent} from './component/item-price/item-price.component';
import {CoreModule} from '../../../../core/core.module';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {ItemShowComponent} from './item-show/item-show.component';
import { ItemPricesComponent } from './component/item-prices/item-prices.component';
import { ItemProjectsComponent } from './component/item-projects/item-projects.component';
import { ItemSuppliersComponent } from './component/item-suppliers/item-suppliers.component';
import { ItemSummaryInfoComponent } from './component/item-summary-info/item-summary-info.component';
import { ItemPhotoComponent } from './component/item-photo/item-photo.component';

@NgModule({
  declarations: [ItemComponent, ItemCreateComponent, ItemPriceComponent, ItemEditComponent, ItemShowComponent,
    ItemPricesComponent, ItemProjectsComponent, ItemSuppliersComponent, ItemSummaryInfoComponent, ItemPhotoComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule,
    ContactModule,
    FormsModule,
    CoreModule,
  ]
})
export class ItemModule {
}
