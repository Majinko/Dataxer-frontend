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
  @Input() priceWithDph: boolean;

  reserves = [
    {
      id: 1,
      title: '1 deň',
      value: 1
    },
    {
      id: 2,
      title: '2 dni',
      value: 2
    },
    {
      id: 3,
      title: '5 dni',
      value: 5
    },
    {
      id: 4,
      title: '1 týžden',
      value: 7
    },
    {
      id: 5,
      title: '2 týždne',
      value: 14
    },
    {
      id: 6,
      title: '4 týždne',
      value: 28
    },
  ];

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

  modelChanged($event: any) {
    this.cdr.detectChanges();
  }

  get f() {
    return this.itemPriceForm.controls;
  }
}
