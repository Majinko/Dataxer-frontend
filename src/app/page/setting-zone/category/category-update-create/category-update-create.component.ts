import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './category-opdate-create.component.html',
  styleUrls: ['./category-update-create.component.scss']
})
export class CategoryUpdateCreateComponent implements OnInit {
  formGroup: FormGroup;
  categories: CategoryItemNode[];

  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    @Optional() public dialogRef: MatDialogRef<CategoryUpdateCreateComponent>,
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      categoryGroup: 'COMPANY',
      categoryType: 'SERVICE',
      parentId: null,
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
      this.messageService.add('Kategória bola vytvorená');

      if (this.dialogRef === null) {
        this.router.navigate(['/setting/category']);
      }
    });
  }

  close() {
    if (this.formGroup.valid) {
      this.dialogRef.close();
    }
  }
}
