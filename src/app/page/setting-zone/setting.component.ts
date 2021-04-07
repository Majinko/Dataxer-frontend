import {Component, Inject, OnInit} from '@angular/core';
import {SidenavService} from '../../core/services/sidenav.service';
import {SettingMenuItems} from '../../core/data/setting-menu-items';
import {GodButtonService} from '../../core/services/god-button.service';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../../core/services/company.service';
import {NgxPermissionsService} from 'ngx-permissions';


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
    private companyService: CompanyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private permissionService: NgxPermissionsService
  ) {
    godButtonService.title = null;
  }

  ngOnInit(): void {
    this.userService.user = this.route.snapshot.data.user;
    this.companyService.company = this.route.snapshot.data.company;

    this.preparePermission();
  }

  private preparePermission() {
    this.userService.user.roles.forEach(r => {
      this.permissionService.addPermission(r.privileges.map(p => p.name));
    });
  }
}
