import {Component, Inject, OnInit} from '@angular/core';
import {SidenavService} from '../../core/services/sidenav.service';
import {MenuItems} from '../../core/data/menu-items';
import {CompanyService} from '../../core/services/company.service';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {GodButtonService} from '../../core/services/god-button.service';

@Component({
  selector: 'app-page',
  template: `
    <app-message></app-message>
    <app-toolbar></app-toolbar>
    <mat-sidenav-container>
      <mat-sidenav  [mode]="sidenavService.mobileQuery.matches ? 'over' : 'side'" [(opened)]="sidenavService.opened" class="border-0 h-100">
        <app-drawer [menuItems]="menuItems"></app-drawer>
      </mat-sidenav>
      <mat-sidenav-content class="bg-white py-4">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>`,
})
export class DashboardComponent implements OnInit {
  menuItems = MenuItems;

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    public sidenavService: SidenavService,
    private companyService: CompanyService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userService.user = this.route.snapshot.data.user;
    this.companyService.company = this.route.snapshot.data.company;

    this.godButtonService.showModal = false;
  }
}
