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
      value: '1 deň'
    },
    {
      id: 2,
      value: '2 dni'
    },
    {
      id: 3,
      value: '5 dni'
    },
    {
      id: 4,
      value: '1 týžden'
    },
    {
      id: 5,
      value: '2 týždne'
    },
    {
      id: 6,
      value: '4 týždne'
    },
    {
      id: 7,
      value: '1 mesiac'
    }
  ]

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
