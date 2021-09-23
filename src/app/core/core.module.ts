import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZeroValuePipe} from './pipes/zero-value.pipe';
import {AddPercentPipe} from './pipes/add-percent.pipe';
import {GetinitialsPipe} from './pipes/getinitials.pipe';
import {FilterPersonPipe} from './pipes/filter-person.pipe';
import {RemovePercentPipe} from './pipes/remove-percent.pipe';
import {NotNullPipe} from './pipes/not-null.pipe';
import {SortByPipe} from './pipes/sort-by.pipe';
import {RemovePercentGetNumberPipe} from './pipes/remove-percent-get-number.pipe';
import {TimeFromTimestampPipe} from './pipes/time-from-timestamp.pipe';
import {StrftimePipe} from './pipes/strftime.pipe';
import {FormatPricePipe} from './pipes/format-price.pipe';
import {AdHostDirective} from './directives/ad-host.directive';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { ShowHideTaxDirective } from './directives/show-hide-tax.directive';

@NgModule({
  declarations: [
    ZeroValuePipe,
    AddPercentPipe,
    GetinitialsPipe,
    FilterPersonPipe,
    RemovePercentPipe,
    NotNullPipe,
    SortByPipe,
    RemovePercentGetNumberPipe,
    TimeFromTimestampPipe,
    StrftimePipe,
    FormatPricePipe,
    AdHostDirective,
    FileDragDropDirective,
    ShowHideTaxDirective,
  ],
    exports: [
        AdHostDirective,
        ZeroValuePipe,
        AddPercentPipe,
        GetinitialsPipe,
        FilterPersonPipe,
        RemovePercentPipe,
        NotNullPipe,
        SortByPipe,
        RemovePercentGetNumberPipe,
        TimeFromTimestampPipe,
        StrftimePipe,
        FormatPricePipe,
        FileDragDropDirective,
        ShowHideTaxDirective,
    ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule {
}
