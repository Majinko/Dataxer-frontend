import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZeroValuePipe} from './pipes/zero-value.pipe';
import {AddPercentPipe} from './pipes/add-percent.pipe';
import {GetinitialsPipe} from './pipes/getinitials.pipe';
import {FilterPersonPipe} from './pipes/filter-person.pipe';
import { RemovePercentPipe } from './pipes/remove-percent.pipe';
import { NotNullPipe } from './pipes/not-null.pipe';


@NgModule({
  declarations: [ZeroValuePipe, AddPercentPipe, GetinitialsPipe, FilterPersonPipe, RemovePercentPipe, NotNullPipe],
  exports: [
    ZeroValuePipe,
    AddPercentPipe,
    GetinitialsPipe,
    FilterPersonPipe,
    RemovePercentPipe,
    NotNullPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule {
}
