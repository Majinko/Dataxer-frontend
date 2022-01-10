import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';
import {ActivatedRoute} from '@angular/router';
import {ProfileDialogComponent} from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
    this.godButtonService.component = ProfileDialogComponent;
    this.godButtonService.showModal = true;
    this.godButtonService.menuItem = [];
  }

}
