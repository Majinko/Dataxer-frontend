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
import {CoreModule} from '../../../../core/core.module';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {ItemShowComponent} from './item-show/item-show.component';
import { ItemProjectsComponent } from './component/item-projects/item-projects.component';
import { ItemSuppliersComponent } from './component/item-suppliers/item-suppliers.component';
import { ItemSummaryInfoComponent } from './component/item-summary-info/item-summary-info.component';
import { ItemPhotoComponent } from './component/item-photo/item-photo.component';
import { ItemProjectsDialogComponent } from './component/item-projects-dialog/item-projects-dialog.component';
import { ItemSupplierDialogComponent } from './component/item-supplier-dialog/item-supplier-dialog.component';
import {AvatarModule} from 'ngx-avatar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [ItemComponent, ItemCreateComponent, ItemEditComponent, ItemShowComponent,
        ItemProjectsComponent, ItemSuppliersComponent, ItemSummaryInfoComponent, ItemPhotoComponent,
        ItemProjectsDialogComponent, ItemSupplierDialogComponent],
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
        AvatarModule,
        MatSlideToggleModule,
    ]
})
export class ItemModule {
}
