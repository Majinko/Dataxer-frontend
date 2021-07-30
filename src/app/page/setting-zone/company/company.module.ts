import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyIndexComponent} from './company-index/company-index.component';
import {CompanyRoutingModule} from './company-routing.module';
import {CompanyComponent} from './company.component';
import {CompanyEditComponent} from './company-edit/company-edit.component';
import {CompanyCreateComponent} from './company-create/company-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../theme/modules/material.module';
import {AvatarModule} from 'ngx-avatar';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../theme/theme.module';


@NgModule({
  declarations: [CompanyComponent, CompanyIndexComponent, CompanyEditComponent, CompanyCreateComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        AvatarModule,
        NgSelectModule,
        ThemeModule
    ]
})
export class CompanyModule {
}
