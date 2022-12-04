import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {SearchBarService} from '../../../../core/services/search-bar.service';
import {Title} from '@angular/platform-browser';

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
export class OverviewComponent implements OnInit, OnDestroy {
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private readonly searchBarService: SearchBarService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Prehľady | Dataxer');
  }

  ngOnInit(): void {
    this.godButtonService.title = null;
    this.searchBarService.showBar = false;

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
      {
        label: 'Grafický prehľad nákladov',
        link: '/overview/charts',
        index: 3
      },
      {
        label: 'Celkový prehľad spoločností',
        link: '/overview/firms',
        index: 4
      },
      {
        label: 'Denný prehľad',
        link: '/overview/daily',
        index: 5
      },
      {
        label: 'Hodiny cena',
        link: '/overview/hours-price',
        index: 6
      },
    ];
  }

  ngOnDestroy(): void {
    this.searchBarService.showBar = true;
  }
}
