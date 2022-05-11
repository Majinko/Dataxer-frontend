import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  CategoryItemNodeDemand,
  CategoryItemNodeWithSharedCategory
} from '../../../../../core/models/category-item-node';

@Component({
  selector: 'app-category-tree-shared-categories',
  templateUrl: './category-tree-shared-categories.component.html',
  styleUrls: ['./category-tree-shared-categories.component.scss']
})
export class CategoryTreeSharedCategoriesComponent implements OnInit, OnChanges {
  sharedCategory: CategoryItemNodeDemand;

  @Input() node: CategoryItemNodeWithSharedCategory;
  @Input() sharedCategories: CategoryItemNodeDemand[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  change(sharedCategory: CategoryItemNodeDemand, type: string) {
    if (type === 'name') {
      sharedCategory.showName = !sharedCategory.showName;
    } else {
      sharedCategory.showPerson = !sharedCategory.showPerson;
    }

    this.node.sharedCategory = this.sharedCategory;
  }

  changeCategory() {
    this.node.sharedCategory = this.sharedCategory;
  }
}

