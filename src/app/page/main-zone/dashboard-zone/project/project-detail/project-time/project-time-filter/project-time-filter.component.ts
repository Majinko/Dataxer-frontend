import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../../../../core/services/user.service';
import { CategoryHelper } from '../../../../../../../core/class/CategoryHelper';
import { CategoryService } from '../../../../../../../core/services/category.service';
import { SimpleFilterHelpers } from '../../../../../../../core/class/SimpleFilterHelpers';

@Component({
  selector: 'app-project-time-filter',
  templateUrl: './project-time-filter.component.html',
  styleUrls: ['./project-time-filter.component.scss']
})
export class ProjectTimeFilterComponent extends SimpleFilterHelpers implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
    protected categoryService: CategoryService,
    protected categoryHelper: CategoryHelper,
    protected userService: UserService,
  ) { super(dialog, categoryService, categoryHelper, userService); }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userId: null,
      categoryId: null,
      date: null,
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.onFilter.emit();
    });
    this.getUsers();
    this.prepareDates();
    this.prepareYears();
    this.getCategories();
  }



}
