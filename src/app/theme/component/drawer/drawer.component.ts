import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../core/models/menu-item';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() menuItems: MenuItem[];


  constructor() {
  }

  ngOnInit() {
  }
}
