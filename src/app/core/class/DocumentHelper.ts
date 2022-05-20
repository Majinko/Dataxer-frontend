import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Pack} from '../models/pack';
import {Taxes} from '../models/taxes';

@Injectable()
export class DocumentHelper {
  packs: Pack[];
  price: number = 0;
  totalPrice: number = 0;
  taxResult: Taxes[] = [];

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
            item.totalPrice = +this.addPercent(+item.price * +item.qty, +item.tax, 2);
            item.totalPriceRoundThreeDigits = +this.addPercent(+item.price * +item.qty, +item.tax, 3);

            pack.totalPrice += +this.removePercent(+item.totalPriceRoundThreeDigits, +item.discount, 3);
            pack.price += (!isNaN(+item.price) && !isNaN(+item.qty)) ? +this.removePercent((+item.price * +item.qty), +item.discount) : 0;

            this.price += +this.removePercent(+item.price * +item.qty, +item.discount);
            this.totalPrice += +this.removePercent(+item.totalPriceRoundThreeDigits, +item.discount, 3);
          });

          pack.price = +pack.price.toFixed(2);
          pack.totalPrice = +pack.totalPrice.toFixed(2);
        }
      } else {
        pack.totalPrice += +this.addPercent(+pack.price, +pack.tax);

        this.price += pack.price;
        this.totalPrice += +pack.totalPrice;
      }
    });

    this.price = +this.price.toFixed(2);
    this.totalPrice = +this.totalPrice.toFixed(2);
  }

  addPercent(value: any, args: any, fractionDigits: number = 2): number {
    const result: any = (parseFloat(value) / 100) * parseFloat(args) + parseFloat(value);

    return !isNaN(result) ? result.toFixed(fractionDigits) : 0;
  }

  removePercent(value: any, args: any, fractionDigits: number = 2): number {
    const result: any = value - (parseFloat(value) / 100) * parseFloat(args);

    return !isNaN(result) ? result.toFixed(fractionDigits) : 0;
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
        tAxResult.price += +this.removePercent(+item.price * +item.qty, +item.discount);
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

  prepareTaxesFromPackForSummaryInvoice(packs: Pack[]) {
    const payedPack = packs.filter(p => p.title === 'Uhradené zálohou');
  }

  scrollTo(el: Element) {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.mat-error');
    this.scrollTo(firstElementWithError);
  }

  // todo presunut do utils
  async scrollIfFormHasErrors(form: FormGroup): Promise <any> {
    await form.invalid;
    this.scrollToError();
  }
}
