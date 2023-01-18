import {Component, Inject, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../core/models/menu-item';
import {ActivatedRoute, Router} from '@angular/router';
import {SidenavService} from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() menuItems: MenuItem[];

  constructor(
    @Inject(SidenavService) public sidenavService: SidenavService,
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  linkClick(link: MenuItem) {
    this.sidenavService.opened = !this.sidenavService.mobileQuery.matches;
  }
}
