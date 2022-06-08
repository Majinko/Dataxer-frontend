import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';

@Component({
  selector: 'app-item-summary-info',
  templateUrl: './item-summary-info.component.html',
  styleUrls: ['./item-summary-info.component.scss']
})
export class ItemSummaryInfoComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
