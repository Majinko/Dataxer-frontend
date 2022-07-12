import {AfterViewChecked, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {AddPercentPipe} from '../../../../../../core/pipes/add-percent.pipe';
import {RemovePercentPipe} from '../../../../../../core/pipes/remove-percent.pipe';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss'],
  providers: [AddPercentPipe, RemovePercentPipe]
})
export class ItemPriceComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() itemPriceForm: FormGroup;
  @Input() type: string;

  constructor(
    @Inject(AddPercentPipe) private addPercent: AddPercentPipe,
    @Inject(RemovePercentPipe) private removePercentPipe: RemovePercentPipe,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
