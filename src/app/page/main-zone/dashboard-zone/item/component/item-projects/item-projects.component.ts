import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';

@Component({
  selector: 'app-item-projects',
  templateUrl: './item-projects.component.html',
  styleUrls: ['./item-projects.component.scss']
})
export class ItemProjectsComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
