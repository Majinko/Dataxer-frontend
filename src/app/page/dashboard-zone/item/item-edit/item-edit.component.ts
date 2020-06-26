import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from "../../../../core/services/item.service";
import {Item} from "../../../../core/models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryItemNode} from "../../../../core/models/category-item-node";
import {Contact} from "../../../../core/models/contact";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {CategoryService} from "../../../../core/services/category.service";
import {ContactService} from "../../../../core/services/contact.service";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  item: Item;
  formGroup: FormGroup;
  categories: CategoryItemNode[];
  colors: string[] = ['zlta', 'modra', 'biela'];
  material: string[] = ['kov', 'drevo', 'zlato'];
  contacts: Contact[];

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly contactService: ContactService,
    private messageService: MessageService,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getItem();
    this.getCategories();
    this.getContact();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: '',
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
        id: '',
        wholesalePrice: 0,
        wholesaleTax: 20,
        surcharge: 0,
        price: 0,
        tax: 20,
        marge: 0
      })
    });

  }

  getItem() {
    this.itemService.getById(+this.route.snapshot.paramMap.get('item_id')).subscribe(i => {
      this.item = i;

      this.formGroup.patchValue(this.item);
    })
  }

  getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  getContact() {
    this.contactService.all().subscribe(c => this.contacts = c);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid)
      return;

    this.itemService.update(this.formGroup.value).subscribe(i => {
      this.messageService.add("Item was update")
    })
  }
}
