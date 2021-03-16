import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Pack} from '../models/pack';
import {Taxes} from '../models/taxes';

@Injectable()
export class DocumentHelper {
  packs: Pack[];
  taxResult: Taxes[] = [];
  price: number = 0;
  totalPrice: number = 0;

  // change input value packs
  handlePackChanges(packs: AbstractControl) {
    // tslint:disable-next-line:no-shadowed-variable
    packs.valueChanges.subscribe((packs) => {
      this.packs = packs;

      this.calcPackPrice();
    });
  }

  calcPackPrice() {
    this.price = 0;
    this.totalPrice = 0;

    this.packs.forEach(pack => {
      pack.totalPrice = 0;

      if (pack.customPrice === false) {
        pack.price = 0;

        if (pack.packItems) {
          pack.packItems.forEach(item => {
            item.totalPrice = +this.addPercent(+item.price * +item.qty, +item.tax);

            pack.totalPrice += +this.removePercent(+item.totalPrice, +item.discount);
            pack.price += !isNaN(+item.price) && !isNaN(+item.qty) ? +this.removePercent((+item.price * +item.qty), +item.discount) : 0;

            this.price += +this.removePercent(+item.price * +item.qty, +item.discount);
            this.totalPrice += +this.removePercent(+item.totalPrice, +item.discount);
          });
        }
      } else {
        pack.totalPrice += +this.addPercent(+pack.price, +pack.tax);

        this.price += pack.price;
        this.totalPrice += +pack.totalPrice;
      }
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

  prepareTaxes(packs: Pack[]) {
    packs.forEach(pack => {
      if (pack.customPrice) {
        this.prepareTaxResult(pack);
      } else {
        pack.packItems.forEach(item => {
          this.prepareTaxResult(item, true);
        });
      }
    });
  }

  prepareTaxResult(item, isItem = false) {
    const tAxResult = this.taxResult.find(t => t.tax === item.tax);
    if (tAxResult !== undefined) {
      if (isItem) {
        tAxResult.price += +this.removePercent(+item.price, +item.discount);
        tAxResult.totalPrice += +this.removePercent(+item.totalPrice, +item.discount);
      } else {
        tAxResult.price += +item.price;
        tAxResult.totalPrice += +item.totalPrice;
      }
    } else {
      if (isItem) {
        this.taxResult.push({
          tax: item.tax,
          price: +this.removePercent(+item.price * +item.qty, +item.discount),
          totalPrice: +this.removePercent(+item.totalPrice, +item.discount)
        });
      } else {
        this.taxResult.push({tax: item.tax, price: item.price, totalPrice: item.totalPrice});
      }
    }
  }

  pdf(x: ArrayBuffer, name: string) {
    const downloadURL = window.URL.createObjectURL(x);
    const link = document.createElement('a');

    link.href = downloadURL;
    link.download = name + '.pdf';
    link.click();
  }
}
