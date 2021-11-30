import {Component, Injector, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {ProjectService} from '../../../../../../core/services/project.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';

@Component({
  selector: 'app-time-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class TimeFilterComponent extends FilterClass implements OnInit {
  constructor(
    private projectService: ProjectService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector
  ) {
    super(
      searchbarService,
      formBuilder,
      'time',
      ['description'],
      ['project.id', 'month'],
      injector
    );
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null,
      month: null
    });

    this.getProjects();
    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.prepareMonths();
  }

  getProjects() {
    this.projectService.allHasUserTime().subscribe((p) => {
      this.projects = p;
    });
  }
}
