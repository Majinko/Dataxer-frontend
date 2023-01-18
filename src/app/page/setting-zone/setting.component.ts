import {Component, Inject, OnInit} from '@angular/core';
import {SidenavService} from '../../core/services/sidenav.service';
import {SettingMenuItems} from '../../core/data/setting-menu-items';
import {GodButtonService} from '../../core/services/god-button.service';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AppProfileService} from '../../core/services/app-profile.service';

@Component({
  selector: 'app-setting',
  template: `
    <app-message></app-message>
    <app-toolbar [showSearchBar]="false"></app-toolbar>
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
export class SettingComponent implements OnInit {
  menuItems = SettingMenuItems;

  constructor(
    @Inject(SidenavService) public sidenavService: SidenavService,
    @Inject(GodButtonService) public godButtonService: GodButtonService,
    private appProfileService: AppProfileService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    godButtonService.title = null;
  }

  ngOnInit(): void {
    this.userService.user = this.route.snapshot.data.user;
    this.appProfileService.appProfile = this.route.snapshot.data.appProfile;
  }
}
