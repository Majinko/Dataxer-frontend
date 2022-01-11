import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from "../../../core/services/god-button.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'group-set-item',
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
export class PackComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Sady položiek | Dataxer');
  }

  ngOnInit() {
    this.godButtonService.menuItem = [];
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
  }
}
