import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../core/models/menu-item';
import {Router} from '@angular/router';
import {slugify} from '../../../../helper';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() menuItems: MenuItem[];


  constructor(public router: Router) {
  }

  ngOnInit() {

  }
}
