import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {CategoryService} from '../../../core/services/category.service';
import {DropdownPosition} from '@ng-select/ng-select/lib/ng-select.component';

@Component({
  selector: 'app-category-select-group',
  templateUrl: './category-select-group.component.html',
  styleUrls: ['./category-select-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategorySelectGroupComponent),
    multi: true
  }]
})
export class CategorySelectGroupComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  categoryItemNode: CategoryItemNode;


  @Input() types: string[];
  @Input() categoryItemNodes: CategoryItemNode[] = [];
  @Input() dropDownPosition: DropdownPosition = 'auto';

  constructor(
    private categoryService: CategoryService
  ) {
  }

  onTouched = () => {
  }
  onChange = _ => {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.categoryItemNodes.length === 0) {
      this.getCategories();

      this.categoryService.categoryUpdateOrStore.subscribe(categoryItemNode => {
        this.onChange(categoryItemNode);
        this.categoryItemNode = categoryItemNode;

        this.categoryItemNodes = this.categoryItemNodes.concat(categoryItemNode);
      });
    }
  }

  private getCategories() {
    if (this.categoryItemNodes.length === 0 && this.types) {
      this.categoryService.fallByTypeIn(this.types).subscribe(categories => this.categoryItemNodes = categories);
    }
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
