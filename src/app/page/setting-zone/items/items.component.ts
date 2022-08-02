import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-items',
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
export class ItemsComponent implements OnInit {
  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Položky | Dataxer');
  }

  ngOnInit() {
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
    this.godButtonService.showModal = false;
  }
}
