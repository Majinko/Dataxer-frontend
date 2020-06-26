import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  formGroup: FormGroup;
  categories: CategoryItemNode[];

  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      parent: null,
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.all().subscribe(cat => this.categories = cat);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }


  onSubmit(category: CategoryItemNode) {
    if (this.formGroup.invalid) {
      return;
    }

    this.categoryService.store(category).subscribe(() => {
      this.router.navigate(['/setting/category']);
    });
  }
}
