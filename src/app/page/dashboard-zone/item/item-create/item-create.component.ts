import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../../../core/models/item';
import {Router} from '@angular/router';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ItemService} from "../../../../core/services/item.service";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  item: Item;
  formGroup: FormGroup;
  categories: CategoryItemNode[];
  colors: string[] = ['zlta', 'modra', 'biela'];
  material: string[] = ['kov', 'drevo', 'zlato'];

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(
    private readonly categoryService: CategoryService,
    private messageService: MessageService,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getCategories();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      category: [null, Validators.required],
      type: null,
      shortDescription: null,
      description: null,
      manufacturer: null,
      supplier: null,
      web: null,
      unit: null,
      code: null,
      dimensions: null,
      isPartOfSet: false,
      needMontage: false,
      priceLevel: 'basic',
      model: null,
      series: null,
      color: null,
      material: null,
      itemPrice: this.formBuilder.group({
        wholesalePrice: 0,
        wholesaleTax: 20,
        surcharge: 0,
        price: 0,
        tax: 20,
        marge: 0
      })
    });
  }

  getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid)
      return;

    this.itemService.store(this.formGroup.value).subscribe(i => {
      this.router.navigate(['/item']).then(() => {
        this.messageService.add("Item was store")
      });
    })
  }
}
