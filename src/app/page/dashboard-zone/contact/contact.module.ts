import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact.component';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactIndexComponent} from './contact-index/contact-index.component';
import {ContactTableComponent} from './contact-index/contact-table/contact-table.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ContactCreateComponent} from './contact-create/contact-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactFilterComponent} from './components/contact-filter/contact-filter.component';
import {AvatarModule} from 'ngx-avatar';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from "../../../theme/theme.module";

@NgModule({
  declarations: [ContactComponent, ContactIndexComponent, ContactTableComponent, ContactCreateComponent, ContactEditComponent, ContactFilterComponent],
    imports: [
        CommonModule,
        ContactRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        AvatarModule,
        NgSelectModule,
        ThemeModule
    ],
  entryComponents: [ContactCreateComponent]
})
export class ContactModule {
}
