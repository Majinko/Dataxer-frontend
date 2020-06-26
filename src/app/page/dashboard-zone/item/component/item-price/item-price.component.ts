import {Component, Inject, Input, OnInit} from '@angular/core';
import {ItemPrice} from '../../../../../core/models/item';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {RemovePercentPipe} from '../../../../../core/pipes/remove-percent.pipe';
import {$v} from 'codelyzer/angular/styles/chars';
import {FormGroup} from "@angular/forms";

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

  callPrice() {
   /* this.itemPrice.wholesalePriceTax = this.addPercent.transform(this.itemPrice.wholesalePrice, this.itemPrice.wholesaleTax);
    this.itemPrice.priceTax = this.addPercent.transform(this.itemPrice.price, this.itemPrice.tax);*/

    this.marge();
  }

  marge() {
    if (this.itemPrice.wholesalePriceTax !== 0) {
      this.itemPrice.marge = ((this.itemPrice.wholesalePriceTax - this.itemPrice.priceTax) );
      console.log(this.itemPrice);
    }
  }

  testMethod($event: any) {
    console.log($event);
  }
}
