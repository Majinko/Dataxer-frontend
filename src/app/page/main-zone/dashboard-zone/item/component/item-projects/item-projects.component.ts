import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';

@Component({
  selector: 'app-item-projects',
  templateUrl: './item-projects.component.html',
  styleUrls: ['./item-projects.component.scss']
})
export class ItemProjectsComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'count', 'price', 'actions'];
  data = [
    {
      name: 'test',
      count: 3,
      price: 28.25,
    }
  ];

  @Input() item: Item;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
