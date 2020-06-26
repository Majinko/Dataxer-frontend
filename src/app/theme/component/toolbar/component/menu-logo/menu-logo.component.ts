import {Component, Inject, OnInit} from '@angular/core';
import {SidenavService} from '../../../../../core/services/sidenav.service';

@Component({
  selector: 'app-menu-logo',
  templateUrl: './menu-logo.component.html',
  styleUrls: ['./menu-logo.component.scss']
})
export class MenuLogoComponent implements OnInit {

  constructor(@Inject(SidenavService) public sidenavService: SidenavService) {
  }

  ngOnInit() {
  }

}
