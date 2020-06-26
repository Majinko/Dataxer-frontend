import {Injectable} from "@angular/core";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {Item} from "../models/item";
import {Pack} from "../models/pack";

@Injectable()
export class DocumentHelper {
  packs: Pack[];
  price: number = 0;
  totalPrice: number = 0;

  // change input value packs
  handlePackChanges(packs: AbstractControl) {
    packs.valueChanges.subscribe((packs) => {
      this.packs = packs;

      this.calcPackPrice();
    })
  }

  calcPackPrice() {
    this.price = 0;
    this.totalPrice = 0;

    this.packs.forEach(pack => {
      pack.totalPrice = 0;

      pack.items.forEach(item => {
        item.totalPrice = +this.addPercent(+item.price * +item.qty, +item.tax)
        pack.totalPrice += +item.totalPrice;

        this.price += +item.price * +item.qty;
        this.totalPrice += +item.totalPrice;
      })
    });
  }

  addPercent(value: any, args: any) {
    const result: any = (parseFloat(value) / 100) * parseFloat(args) + parseFloat(value);

    return !isNaN(result) ? result.toFixed(2) : 0;
  }

  removePercent(value: any, args: any) {
    const result: any = value - (parseFloat(value) / 100) * parseFloat(args);

    return !isNaN(result) ? result.toFixed(2) : 0;
  }
}
