import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DrawerComponent} from './component/drawer/drawer.component';
import {ToolbarComponent} from './component/toolbar/toolbar.component';
import {MaterialModule} from './modules/material.module';
import {GodButtonComponent} from './component/god-button/god-button.component';
import {SearchBarComponent} from './component/toolbar/component/search-bar/search-bar.component';
import {AvatarComponent} from './component/avatar/avatar.component';
import {CoreModule} from '../core/core.module';
import {MessageComponent} from './component/message/message.component';
import {AvatarModule} from 'ngx-avatar';
import {MenuLogoComponent} from './component/toolbar/component/menu-logo/menu-logo.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ItemAutocompleteComponent} from './component/item-autocomplete/item-autocomplete.component';
import {FormsModule} from "@angular/forms";
import {NewContactSelectComponent} from "./component/new-contact-select/new-contact-select.component";
import { PackAutocompleteComponent } from './component/pack-autocomplete/pack-autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    AvatarModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    DrawerComponent,
    ToolbarComponent,
    GodButtonComponent,
    SearchBarComponent,
    AvatarComponent,
    MessageComponent,
    MenuLogoComponent,
    ItemAutocompleteComponent,
    NewContactSelectComponent,
    PackAutocompleteComponent
  ],
    exports: [DrawerComponent, ToolbarComponent, MessageComponent, ItemAutocompleteComponent, NewContactSelectComponent, PackAutocompleteComponent],
})
export class ThemeModule {
}
