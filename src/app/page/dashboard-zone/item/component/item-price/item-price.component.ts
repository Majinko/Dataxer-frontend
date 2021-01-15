import {Component, Inject, Input, OnInit} from '@angular/core';
import {ItemPrice} from '../../../../../core/models/item';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {RemovePercentPipe} from '../../../../../core/pipes/remove-percent.pipe';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss'],
  providers: [AddPercentPipe, RemovePercentPipe]
})
export class ItemPriceComponent implements OnInit {
  @Input() itemPriceForm: FormGroup;

  itemPrice: ItemPrice = {
    price: 0,
    tax: 20,
    priceTax: 0,
    wholesalePrice: 0,
    wholesaleTax: 20,
    wholesalePriceTax: 0,
    marge: 0,
    surcharge: 0,
  };

  constructor(
    @Inject(AddPercentPipe) private addPercent: AddPercentPipe,
    @Inject(RemovePercentPipe) private removePercentPipe: RemovePercentPipe,
  ) {
  }

  ngOnInit() {
  }


  testMethod($event: any) {
    console.log($event);
  }
}
