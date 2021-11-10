import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './category-update-create.component.html',
  styleUrls: ['./category-update-create.component.scss']
})
export class CategoryUpdateCreateComponent implements OnInit {
  formGroup: FormGroup;
  categories: CategoryItemNode[];
  category: CategoryItemNode = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<CategoryUpdateCreateComponent>,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.getCategories();
    this.prepareForm();
  }

  getCategories() {
    this.categoryService.all().subscribe(cat => this.categories = cat);
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      categoryGroup: 'COMPANY',
      categoryType: 'SERVICE',
      parentId: null,
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.categoryService.findById(+this.route.snapshot.paramMap.get('id')).subscribe(c => {
        this.category = c;

        this.formGroup.patchValue(c);
      });
    }
  }

  onSubmit(category: CategoryItemNode) {
    if (this.formGroup.invalid) {
      return;
    }

    this.categoryService.storeOrUpdate(category).subscribe(() => {
      this.messageService.add(`Kategória bola ${this.category ? 'Upravená' : 'Vytvorená'}`);

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

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
