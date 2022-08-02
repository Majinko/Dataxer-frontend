import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsMargeComponent } from './items-marge/items-marge.component';
import {ItemsComponent} from './items.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [{
  path: '',
  component: ItemsComponent,
  children: [
    {
      path: '',
      component: ItemsMargeComponent
    }
  ]
}];

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsMargeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSliderModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ItemsModule { }
