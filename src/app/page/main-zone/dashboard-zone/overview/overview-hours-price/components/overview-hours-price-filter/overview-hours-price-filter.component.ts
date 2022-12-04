import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryItemNode} from '../../../../../../../core/models/category-item-node';
import {Project} from '../../../../../../../core/models/project';
import {User} from '../../../../../../../core/models/user';
import {ProjectService} from '../../../../../../../core/services/project.service';
import {CategoryService} from '../../../../../../../core/services/category.service';
import {UserService} from '../../../../../../../core/services/user.service';
import {CategoryHelper} from '../../../../../../../core/class/CategoryHelper';

@Component({
  selector: 'app-overview-hours-price-filter',
  templateUrl: './overview-hours-price-filter.component.html',
  styleUrls: ['./overview-hours-price-filter.component.scss']
})
export class OverviewHoursPriceFilterComponent implements OnInit {
  formGroup!: FormGroup;
  categories: CategoryItemNode[] = [];
  projects: Project[] = [];
  users: User[] = [];
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
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private categoryHelper: CategoryHelper,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userId: null,
      projectId: null,
      categoryId: null,
      display: null,
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.onFilter.emit();
    });
    this.getUsers();
    this.getProjects();
    this.getCategories();
  }

  get f() {
    return this.formGroup.controls;
  }

  doFilter() {
    if (this.formGroup.invalid) {
      console.log('chyba');

      return;
    }
    this.onFilter.emit();
  }

  /**
   * Get categories
   *
   * @private
   */
  private getCategories() {
    this.categoryService.all().subscribe((categories) => {
      this.categories = this.categoryHelper.prepareOptionTree(categories);
    });
  }

  /**
   * Get users
   *
   * @private
   */
  private getUsers() {
    this.userService.all().subscribe((users) => {
      this.users = users;
    });
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

  resetFilterValue(key: string) {
    this.formGroup.patchValue({[key]: null});
  }
}
