import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';

@Component({
  selector: 'app-category-tree-by-type',
  templateUrl: './category-tree-by-type.component.html',
  styleUrls: ['./category-tree-by-type.component.scss']
})
export class CategoryTreeByTypeComponent implements OnInit {
  categories: CategoryItemNode[] = [];
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.prepareNavLinks();

    this.route.params.subscribe((param) => {
      this.getCategories();
    });
  }

  private getCategories() {
    this.categoryService.allByGroupFromParent(this.route.snapshot.paramMap.get('category_group')).subscribe(categories => {
      this.categories = categories;
    });
  }

  private prepareNavLinks() {
    this.navLinks = [
      {
        label: 'Firma',
        link: `/setting/category/group/COMPANY`,
        index: 0
      },
      {
        label: 'Zákazky',
        link: `/setting/category/group/PROJECT`,
        index: 1
      },
      {
        label: 'Mzdy',
        link: `/setting/category/group/SALARY`,
        index: 2
      },
      {
        label: 'Druhy zákaziek',
        link: `/setting/category/group/TYPE_PROJECT`,
        index: 3
      },
      {
        label: 'Kategórie kontaktov',
        link: `/setting/category/group/CONTACT`,
        index: 4
      }
    ];
  }
}
