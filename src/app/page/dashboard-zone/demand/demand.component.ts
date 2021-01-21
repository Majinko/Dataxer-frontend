import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from "../../../core/services/god-button.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-demand',
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
export class DemandComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.godButtonService.menuItem = [];
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
  }

}
