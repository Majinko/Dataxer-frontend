import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../theme/modules/material.module';
import {PackComponent} from './pack.component';
import {PackRoutingModule} from './pack-routing.module';
import {PackItemsComponent} from './components/pack-items/pack-items.component';
import {ThemeModule} from '../../../theme/theme.module';
import {PackCreateComponent} from './pack-create/pack-create.component';
import { PackEditComponent } from './pack-edit/pack-edit.component';
import { PackShowComponent } from './pack-show/pack-show.component';

@NgModule({
  declarations: [PackComponent, PackCreateComponent, PackItemsComponent, PackEditComponent, PackShowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PackRoutingModule,
    ThemeModule
  ]
})
export class PackModule {
}
