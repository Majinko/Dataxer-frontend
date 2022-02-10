import {Component, Injector, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {ProjectService} from '../../../../../../core/services/project.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {CategoryService} from '../../../../../../core/services/category.service';
import {UserService} from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-time-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class TimeFilterComponent extends FilterClass implements OnInit {
  constructor(
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private userService: UserService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector,
  ) {
    super(
      searchbarService,
      formBuilder,
      'time',
      ['description'],
      ['project.id', 'user.id', 'category.id', 'date'],
      injector
    );
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null,
      date: null,
      category: null,
      user: null
    });

    this.getProjects();
    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.prepareDates();
    this.getUserCategories();
    this.getUsers();

    // only admin has right to filter other user time
    this.isAdmin = this.userService.user.roles.some(r => r.name.includes('ROLE_ADMIN'));
  }

  getProjects() {
    this.projectService.allHasUserTime().subscribe((p) => {
      this.projects = p;
    });
  }

  getUserCategories() {
    this.categoryService.allUserCategoryByTime(this.userService.user.uid).subscribe((categories) => {
      this.categories = categories;
    });
  }

  getUsers() {
    this.userService.all().subscribe((users) => {
      this.users = users;
    });
  }
}
