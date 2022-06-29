import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../../../../core/services/item.service';
import {Item} from '../../../../../core/models/item';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {Contact} from '../../../../../core/models/contact';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {CategoryService} from '../../../../../core/services/category.service';
import {ContactService} from '../../../../../core/services/contact.service';
import {MessageService} from '../../../../../core/services/message.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {UploadHelper} from '../../../../../core/class/UploadHelper';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
  providers: [UploadHelper]
})
export class ItemEditComponent implements OnInit {
  item: Item;
  formGroup: FormGroup;
  categories: CategoryItemNode[];
  colors: string[] = ['zlta', 'modra', 'biela'];
  material: string[] = ['kov', 'drevo', 'zlato'];
  contacts: Contact[];
  isLoading: boolean = false;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly contactService: ContactService,
    private messageService: MessageService,
    private storageService: StorageService,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public uploadHelper: UploadHelper,
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
      category: null,
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
      previewUrl: null,
      files: null,
      itemPrice: this.formBuilder.group({
        id: null,
        supplier: null,
        wholesalePrice: 0,
        wholesaleTax: 20,
        surcharge: 0,
        price: 0,
        priceTax: 0,
        tax: 20,
        marge: 0
      }),
    });
  }

  getItem() {
    this.itemService.getById(+this.route.snapshot.paramMap.get('item_id')).subscribe(i => {
      this.item = i;

      this.formGroup.patchValue(this.item);

      this.getItemImage();
    });
  }

  getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  getContact() {
    this.contactService.all().subscribe(c => this.contacts = c);
  }

  onSubmit() {
    this.isLoading = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.itemService.updateWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(i => {
      this.isLoading = false;
      this.messageService.add('Položka bola aktualizovaná');
    });
  }

  uploadFile(files: File, b: boolean) {
    this.uploadHelper.prepareCustomFile(files[0], b).then(res => {
      this.formGroup.patchValue({
        preview: res
      });
    });
  }

  private getItemImage() {
    this.storageService.getPreviewImage(this.item.id, 'item').subscribe(r => {
      if (r) {
        this.uploadHelper.prepareItemUrl(r.path);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
