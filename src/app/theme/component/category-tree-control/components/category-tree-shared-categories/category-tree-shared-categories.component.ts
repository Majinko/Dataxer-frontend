import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-tree-shared-categories',
  templateUrl: './category-tree-shared-categories.component.html',
  styleUrls: ['./category-tree-shared-categories.component.scss']
})
export class CategoryTreeSharedCategoriesComponent implements OnInit {
  @Input() node;
  @Input() sharedCategories;

  constructor() { }

  ngOnInit(): void {
  }

  change(node, type: string) {
    if (type === 'name') {
      node.visibleName = !node.visibleName;
    } else {
      node.visiblePerson = !node.visiblePerson;
    }
  }

}
