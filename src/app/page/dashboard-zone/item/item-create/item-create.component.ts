import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../../../core/models/item';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ItemService} from '../../../../core/services/item.service';
import {MessageService} from '../../../../core/services/message.service';
import {UploadHelper} from '../../../../core/class/UploadHelper';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  providers: [DocumentHelper]
})
export class ItemCreateComponent implements OnInit {
  item: Item;
  formGroup: FormGroup;
  isLoading: boolean = false;
  categories: CategoryItemNode[];
  colors: string[] = ['zlta', 'modra', 'biela'];
  material: string[] = ['kov', 'drevo', 'zlato'];

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public uploadHelper: UploadHelper,
    public documentHelper: DocumentHelper,
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.duplicateItem();
    this.getCategories();
  }


  prepareForm() {
    this.formGroup = this.formBuilder.group({
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

  private duplicateItem() {
    if (+this.route.snapshot.paramMap.get('original_id')) {
      this.itemService.getById(+this.route.snapshot.paramMap.get('original_id')).subscribe((item) => {
        delete item.id; // remove old item id

        this.formGroup.patchValue({
          ...item
        });
      });
    }
  }

  private getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.isLoading = true;

    if (this.formGroup.invalid) {
      setTimeout(() => {
        this.documentHelper.scrollIfFormHasErrors(this.formGroup).then(() => {
          this.messageService.add('Prosíme o skontrolovanie povinných údajov');
        });
      }, 100);
      this.isLoading = false;
      return;
    }

    this.itemService.storeWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(i => {
      this.uploadHelper.imageUrl = null;

      this.router.navigate(['/item']).then(() => {
        this.messageService.add('Položka bola vytvorená.');
      });
    });
  }

  uploadFile(files: File, b: boolean) {
    this.uploadHelper.prepareCustomFile(files[0], b).then(res => {
      this.formGroup.patchValue({
        preview: res
      });
    });
  }
}
