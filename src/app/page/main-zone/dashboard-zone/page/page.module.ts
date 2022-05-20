import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../../../theme/modules/material.module';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class PageModule {
}
