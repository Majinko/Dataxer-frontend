import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ContactService} from '../../../../../../core/services/contact.service';
import {Contact} from '../../../../../../core/models/contact';
import {ItemPrice} from '../../../../../../core/models/item';

@Component({
  selector: 'app-item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.scss']
})
export class ItemPricesComponent implements OnInit {
  suppliers: Contact[] = [];

  @Input() formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly contactService: ContactService
  ) {
  }

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

  ngOnInit(): void {
    this.getContacts();
  }

  getPrices(): FormArray {
    return this.formGroup.get('itemPrices') as FormArray;
  }

  addPrice(itemPrice: ItemPrice) {
    return this.formBuilder.group({...itemPrice});
  }

  private getContacts() {
    this.contactService.getAll().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  get f() {
    return this.formGroup.controls;
  }
}
