import {Component, Inject} from '@angular/core';
import {SidenavService} from '../../core/services/sidenav.service';
import {MenuItems} from '../../core/data/menu-items';

@Component({
  selector: 'app-page',
  template: `
    <app-message></app-message>
    <app-toolbar></app-toolbar>
    <mat-sidenav-container>
      <mat-sidenav [mode]="sidenavService.mobileQuery.matches ? 'over' : 'side'"
                   [(opened)]="sidenavService.opened" class="border-0">
        <app-drawer [menuItems]="menuItems"></app-drawer>
      </mat-sidenav>
      <mat-sidenav-content class="bg-white py-4">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>`,
})
export class DashboardComponent {
  menuItems = MenuItems;

  constructor(
    @Inject(SidenavService) public sidenavService: SidenavService) {
  }
}
