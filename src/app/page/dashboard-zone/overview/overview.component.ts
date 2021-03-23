import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';

@Component({
  selector: 'app-overview',
  template: `
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>`,
})
export class OverviewComponent implements OnInit {
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
  ) { }

  ngOnInit(): void {
    this.godButtonService.title = null;

    this.navLinks = [
      {
        label: 'Mesačný prehľad časov',
        link: '/overview',
        index: 0
      },
      {
        label: 'Ročný prehľad časov',
        link: '/overview/time-yearly',
        index: 1
      },
      {
        label: 'Ročný prehľad nákladov',
        link: '/overview/cost-yearly',
        index: 2
      },
    ];
  }
}
