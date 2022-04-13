import {Component, Inject, OnInit} from '@angular/core';
import {MenuItems} from '../../core/data/menu-items';
import {GodButtonService} from '../../core/services/god-button.service';
import {SidenavService} from '../../core/services/sidenav.service';
import {AppProfileService} from '../../core/services/app-profile.service';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
  selector: 'app-main-zone',
  template: `
    <app-message></app-message>
    <app-toolbar></app-toolbar>
    <mat-sidenav-container>
      <mat-sidenav [mode]="sidenavService.mobileQuery.matches ? 'over' : 'side'" [(opened)]="sidenavService.opened" class="border-0 h-100">
        <app-drawer [menuItems]="menuItems"></app-drawer>
      </mat-sidenav>
      <mat-sidenav-content class="bg-white py-4">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>`,
})
export class MainComponent implements OnInit {
  menuItems = MenuItems;

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    public sidenavService: SidenavService,
    private appProfileService: AppProfileService,
    private userService: UserService,
    private route: ActivatedRoute,
    private permissionService: NgxPermissionsService
  ) {
  }

  ngOnInit(): void {
    this.userService.user = this.route.snapshot.data.user;
    this.appProfileService.appProfile = this.route.snapshot.data.appProfile;
    this.godButtonService.showModal = false;

    this.preparePermission();
  }

  private preparePermission() {
    this.userService.user.roles.forEach(r => {
      this.permissionService.addPermission(r.privileges.map(p => p.name));
    });
  }
}
