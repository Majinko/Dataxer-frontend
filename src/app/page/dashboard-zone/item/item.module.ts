import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemComponent} from './item.component';
import {ItemRoutingModule} from './item-routing.module';
import {ItemCreateComponent} from './item-create/item-create.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../theme/theme.module';
import {ContactModule} from '../contact/contact.module';
import {ItemPriceComponent} from './component/item-price/item-price.component';
import {CoreModule} from '../../../core/core.module';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {ItemShowComponent} from './item-show/item-show.component';

@NgModule({
  declarations: [ItemComponent, ItemCreateComponent, ItemPriceComponent, ItemEditComponent, ItemShowComponent],
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
