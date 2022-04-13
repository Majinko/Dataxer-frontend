import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-paginate-zone',
  template: `
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-12">
          <h1 class="mb-2">{{title | translate}}</h1>
          <app-paginate-filter
            [modelName]="modelName"
            [inputSearchBarValues]="inputSearchBarValues"
            [inputSearchBarSelectValues]="inputSearchBarSelectValues">
          </app-paginate-filter>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class PaginateZoneComponent implements OnInit {
  title: string = 'Čas';

  modelName: string;
  isShowFilter: boolean = false;
  inputSearchBarValues: string[];
  inputSearchBarSelectValues: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // todo title service
  ) {
  }

  ngOnInit(): void {
    this.prepareTitle();
    this.prepareFilter();

    this.router.events.subscribe(() => {
      this.prepareTitle();
      this.prepareFilter();
    });
  }

  private prepareTitle(): void {
    this.title = this.router.url.split('/')[2];
  }

  private prepareFilter(): void {
    this.route.firstChild.data.subscribe(data => {
      this.modelName = data.modelName;
      this.isShowFilter = data.isShowFilter;
      this.inputSearchBarValues = data.inputSearchBarValues;
      this.inputSearchBarSelectValues = data.inputSearchBarSelectValues;
    });
  }
}
