import {Component, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {ProjectService} from '../../../../../../core/services/project.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-time-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class TimeFilterComponent extends FilterClass implements OnInit {
  constructor(
    private projectService: ProjectService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
  ) {
    super(searchbarService, formBuilder, 'time', ['description'], ['project.id', 'month']
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

  prepareMonths() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.months.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
      });
    }

    this.filterForm.patchValue({
      month: this.months[0]
    });
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  };
}
