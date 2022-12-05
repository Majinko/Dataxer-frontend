import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from '../../../../../../../core/models/project';
import { ProjectService } from '../../../../../../../core/services/project.service';
import { CategoryService } from '../../../../../../../core/services/category.service';
import { UserService } from '../../../../../../../core/services/user.service';
import { CategoryHelper } from '../../../../../../../core/class/CategoryHelper';
import { MatDialog } from '@angular/material/dialog';
import { SimpleFilterHelpers } from '../../../../../../../core/class/SimpleFilterHelpers';

@Component({
  selector: 'app-overview-hours-price-filter',
  templateUrl: './overview-hours-price-filter.component.html',
  styleUrls: ['./overview-hours-price-filter.component.scss']
})
export class OverviewHoursPriceFilterComponent extends SimpleFilterHelpers implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  options = [
    {
      name: 'Hodiny bez ceny',
      value: 'withoutPrice'
    },
    {
      name: 'Hodiny - brutto cena',
      value: 'brutto'
    },
    {
      name: 'Hodiny - netto cena',
      value: 'netto'
    }
  ];

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
    protected projectService: ProjectService,
    protected categoryService: CategoryService,
    protected categoryHelper: CategoryHelper,
    protected userService: UserService,
  ) {
    super(dialog, categoryService, categoryHelper, userService);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userId: null,
      projectId: null,
      categoryId: null,
      date: null,
      display: null,
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.onFilter.emit();
    });
    this.getUsers();
    this.getProjects();
    this.prepareDates();
    this.prepareYears();
    this.getCategories();
  }

  /**
   * Get all projects
   * @private
   */
  private getProjects() {
    this.projectService.all().subscribe((projects) => {
      this.projects = projects.map(project => {
        project.group = 'Všetky zákazky';

        return project;
      });

      this.allProjects = this.projects;
    });
  }
}
