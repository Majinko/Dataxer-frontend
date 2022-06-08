import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ContactService} from '../../../../../../core/services/contact.service';
import {Contact} from '../../../../../../core/models/contact';
import {Item, ItemPrice} from '../../../../../../core/models/item';
import {AppPaginateData} from "../../../../../../core/class/AppPaginateData";

@Component({
  selector: 'app-item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.scss']
})
export class ItemPricesComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'currentTo', 'actions'];
  data = [
    {
      name: 'test',
      price: 28.25,
      currentTo: '12.5.2023'
    }
  ];

  @Input() item: Item;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
