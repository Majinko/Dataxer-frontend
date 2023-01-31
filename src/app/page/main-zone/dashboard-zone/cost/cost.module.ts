import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CostComponent} from './cost.component';
import {RouterModule, Routes} from '@angular/router';
import {CostCreateComponent} from './cost-create/cost-create.component';
import {CostEditComponent} from './cost-edit/cost-edit.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../../../theme/theme.module';
import {CoreModule} from '../../../../core/core.module';
import {CostShowComponent} from './cost-show/cost-show.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {AvatarModule} from 'ngx-avatar';
import {CostCreateFromFileComponent} from './cost-create-from-file/cost-create-from-file.component';
import {AngularSplitModule} from 'angular-split';
import { CostCreateImagesComponent } from './cost-create-from-file/components/cost-create-images/cost-create-images.component';
import {PinchZoomModule} from 'ngx-pinch-zoom';
import {Ng2ScreenshotModule} from 'ng2-screenshot';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AngularResizeEventModule } from 'angular-resize-event';
import { CostCreateFilePackComponent } from './cost-create-from-file/components/cost-create-file-pack/cost-create-file-pack.component';

const routes: Routes = [
  {
    path: '',
    component: CostComponent,
    children: [
      {
        path: 'create',
        component: CostCreateComponent
      },
      {
        path: 'createFromFile',
        component: CostCreateFromFileComponent
      },
      {
        path: 'create/:id',
        component: CostCreateComponent
      },
      {
        path: 'edit/:id',
        component: CostEditComponent
      },
      {
        path: 'show/:id',
        component: CostShowComponent
      }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    ThemeModule,
    CoreModule,
    NgSelectModule,
    TranslateModule,
    AvatarModule,
    AngularSplitModule,
    PinchZoomModule,
    Ng2ScreenshotModule,
    MatSlideToggleModule,
    FormsModule,
    AngularResizeEventModule
  ],
  declarations: [
    CostComponent,
    CostCreateComponent,
    CostEditComponent,
    CostShowComponent,
    CostCreateFromFileComponent,
    CostCreateImagesComponent,
    CostCreateFilePackComponent,
  ],
})
export class CostModule {
}
