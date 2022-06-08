import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';

@Component({
  selector: 'app-item-suppliers',
  templateUrl: './item-suppliers.component.html',
  styleUrls: ['./item-suppliers.component.scss']
})
export class ItemSuppliersComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
