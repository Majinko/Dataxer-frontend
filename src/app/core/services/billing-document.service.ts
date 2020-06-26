import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingDocumentService {
  billingDocumentSets = [];

  constructor() {
  }

  addSet() {
    this.billingDocumentSets.push({
      name: '',
      custom_price: false,
      tax: 20,
      price: 0,
      items: [{
        name: '',
        count: 1,
        unit: 'ks',
        tax: 20,
        price: 0,
      }]
    });
  }

  deleteSet(index: number): void {
    this.billingDocumentSets.splice(index, 1);
  }
}
