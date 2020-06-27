import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZeroValuePipe} from './pipes/zero-value.pipe';
import {AddPercentPipe} from './pipes/add-percent.pipe';
import {GetinitialsPipe} from './pipes/getinitials.pipe';
import {FilterPersonPipe} from './pipes/filter-person.pipe';
import { RemovePercentPipe } from './pipes/remove-percent.pipe';
import { NotNullPipe } from './pipes/not-null.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [ZeroValuePipe, AddPercentPipe, GetinitialsPipe, FilterPersonPipe, RemovePercentPipe, NotNullPipe, SortByPipe],
    exports: [
        ZeroValuePipe,
        AddPercentPipe,
        GetinitialsPipe,
        FilterPersonPipe,
        RemovePercentPipe,
        NotNullPipe,
        SortByPipe
    ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule {
}
