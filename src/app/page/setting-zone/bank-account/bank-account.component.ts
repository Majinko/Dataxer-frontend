import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';
import {ActivatedRoute} from '@angular/router';
import {BankAccountDialogComponent} from './bank-account-dialog/bank-account-dialog.component';

@Component({
  selector: 'app-bank-account',
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
export class BankAccountComponent implements OnInit {
  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
    this.godButtonService.component = BankAccountDialogComponent;
    this.godButtonService.showModal = true;
    this.godButtonService.menuItem = [];
  }
}
