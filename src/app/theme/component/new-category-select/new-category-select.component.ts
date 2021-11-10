import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../core/services/category.service';
import {CategoryUpdateCreateComponent} from '../../../page/setting-zone/category/category-update-create/category-update-create.component';

@Component({
  selector: 'app-new-category-select',
  templateUrl: './new-category-select.component.html',
  styleUrls: ['./new-category-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NewCategorySelectComponent),
    multi: true
  }]
})
export class NewCategorySelectComponent implements ControlValueAccessor, OnInit {
  categoryItemNode: CategoryItemNode;
  categoryItemNodes: CategoryItemNode[] = [];

  @Input() showAddButton: boolean = true;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
  }

  onTouched = () => {
  };
  onChange = _ => {
  };

  ngOnInit(): void {
    this.getCategories();

    this.categoryService.categoryUpdateOrStore.subscribe(categoryItemNode => {
      this.onChange(categoryItemNode);
      this.categoryItemNode = categoryItemNode;

      this.categoryItemNodes = this.categoryItemNodes.concat(categoryItemNode);
    });
  }

  private getCategories() {
    this.categoryService.all().subscribe(categories => this.categoryItemNodes = categories);
  }

  openDialog() {
    this.dialog.open(CategoryUpdateCreateComponent, {
      data: {inModal: true},
      autoFocus: false
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(category: CategoryItemNode) {
    this.categoryItemNode = category;
  }

  selectCategory(category: CategoryItemNode) {
    this.onChange(category);
  }
}
