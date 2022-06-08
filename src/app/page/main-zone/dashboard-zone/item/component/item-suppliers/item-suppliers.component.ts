import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from "../../../../../../core/class/AppPaginateData";

@Component({
  selector: 'app-item-suppliers',
  templateUrl: './item-suppliers.component.html',
  styleUrls: ['./item-suppliers.component.scss']
})
export class ItemSuppliersComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'count', 'price', 'actions'];
  data = [
    {
      name: 'testovací',
      count: 68,
      price: 280.25,
    }
  ];

  @Input() item: Item;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
