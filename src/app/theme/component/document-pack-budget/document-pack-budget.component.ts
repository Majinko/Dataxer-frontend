import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {Pack} from '../../../core/models/pack';
import {PackService} from '../../../core/services/pack.service';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {CategoryService} from '../../../core/services/category.service';
import {Project} from '../../../core/models/project';
import {DocumentPackHelpers} from '../../../core/class/DocumentPackHelpers';
import {ProjectService} from '../../../core/services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../../core/services/message.service';
import {ItemEditComponent} from '../../../page/main-zone/dashboard-zone/item/item-edit/item-edit.component';
import {ItemCreateComponent} from '../../../page/main-zone/dashboard-zone/item/item-create/item-create.component';
import {
  DocumentPackTitleDialogComponent
} from '../document-pack/components/document-pack-title-dialog/document-pack-title-dialog.component';

@Component({
  selector: 'app-document-pack-budget',
  templateUrl: './document-pack-budget.component.html',
  styleUrls: ['./document-pack-budget.component.scss']
})
export class DocumentPackBudgetComponent extends DocumentPackHelpers implements OnInit {
  categories: CategoryItemNode[];
  titleOptions = [];
  titlePack;

  @Input() packs: Pack[];
  @Input() formGroup: FormGroup;
  @Input() documentId: number;
  @Input() projects: Project[];
  @Input() documentHelper: DocumentHelper;
  @Input() fromDemand: boolean;

  @Output() compareProjects: EventEmitter<boolean> = new EventEmitter();
  @Output() compareCategory: EventEmitter<boolean> = new EventEmitter();

  constructor(
    protected formBuilder: FormBuilder,
    private packService: PackService,
    protected projectService: ProjectService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private messageService: MessageService,
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.documentHelper.handlePackChanges(this.f.packs);

    this.preparePack();
    this.getCategories();
    this.handleChangesForm();

    setTimeout(() => {
      if (this.packs) {
        this.formGroup.patchValue({packs: this.packs});
      }
    }, 1);
  }

  private getCategories() {
    this.projectService.getCategories(this.projects[0].id).subscribe((categories) => {
      this.categories = categories;
    });

    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      if (project && project.id) {
        this.projectService.getCategories(project.id).subscribe((categories) => {
          this.categories = categories;
        });
      }
    });
  }

  // set pack when find it
  setPack(packIndex: number, packFormGroup: AbstractControl, pack: Pack) {
    this.packService.getById(pack.id).subscribe(p => {
      this.setPackData(packIndex, packFormGroup, p);
      if (this.titleOptions.length > 0) {
        this.changeTitle();
      }
    });
  }

  // show hide pack item
  showHidePackItems(index: number) {
    this.documentHelper.packs[index].showItems = !this.documentHelper.packs[index].showItems;
  }

  private handleChangesForm() {

    // on chance project path it to items
    if (this.formGroup.get('project')) {
      this.formGroup.get('project').valueChanges.subscribe((project) => {
        let packIndex = 0;

        this.formPacks.controls.forEach((pack) => {
          this.itemsByIndex(packIndex).controls.forEach((item) => {
            item.patchValue({
              project
            });
          });

          packIndex++;
        });
        this.checkProjects();
      });
    }

    if (this.formGroup.get('category')) {
      this.formGroup.get('category').valueChanges.subscribe((category) => {
        let packIndex = 0;

        this.formPacks.controls.forEach((pack) => {
          this.itemsByIndex(packIndex).controls.forEach((item) => {
            item.patchValue({
              category
            });
          });

          packIndex++;
        });
        this.checkProjects();
      });
    }
  }

  documentRemoveItem($event: MouseEvent, itemIndex: number, packIndex: number) {
    this.removeItem($event, itemIndex, packIndex);
    this.checkProjects();
  }


  onValueChange($event: any, item: any) {
    if ($event && $event.id) {
      this.projectService.getCategories($event.id).subscribe((categories) => {
        item.projectCategories = categories;
        this.checkProjects();
      });
    }else {
      this.categoryService.fallByGroupIn(['COMPANY', 'SALARY'], false).subscribe((nestedCategories) => {
        item.projectCategories = nestedCategories;
        this.checkProjects();
      });
    }
  }

  checkProjects() {
    let p1: number;
    let p2: number;
    let c1: number;
    let c2: number;
    let packIndex = 0;
    let differentProject = false;
    let differentCategory = false;
    this.formPacks.controls.forEach((pack) => {
      this.itemsByIndex(packIndex).controls.forEach((item) => {
        p1 = this.formGroup.get('project')?.value?.id;
        p2 = item?.value?.project?.id;
        c1 = this.formGroup.get('category')?.value?.id;
        c2 = item?.value?.category?.id;
        if (p1 && p2) {
          if (p1 !== p2) {
            differentProject = true;
          }
        }
        if (c1 && c2) {
          if (c1 !== c2) {
            differentCategory = true;
          }
        }
      });
      packIndex++;
    });
    this.compareProjects.emit(differentProject);
    this.compareCategory.emit(differentCategory);
  }

  settingTitle() {
    const dialogRef = this.dialog.open(DocumentPackTitleDialogComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        pack: this.titlePack
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.titlePack = dialogResult;
        this.titleOptions = dialogResult.done;
        if (this.titleOptions.length > 0) {
          this.changeTitle();
        }
      }
    });
  }

  private changeTitle() {
    let packIndex = 0;

    this.formPacks.controls.forEach((pack) => {
      this.itemsByIndex(packIndex).controls.forEach((item) => {
        let data = '';
        this.titleOptions.forEach(f => {
          let title;
          if (item.value.item) {
            title = item.value.item[f.value];
          }
          if (title) {
            if (typeof (title) !== 'string') {
              title = title?.name;
            }
            if (data) {
              data = data + ' ' + title;
            } else {
              data = title;
            }
          }
        });
        if (data) {
          item.patchValue({
            title: data
          });
        } else {
          this.messageService.add('Nepodarilo sa zmeniť názov niektorých položiek.');
        }
      });
      packIndex++;
    });
  }


  itemDialog(item: any) {
    if (item.value.item?.id) {
      const dialogRef = this.dialog.open(ItemEditComponent, {
        width: '100%',
        data: {
          inModal: true,
          item: item.value
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.setItem(item, dialogResult);
        }
      });
    }

  }

  addItemDialog() {
    const dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '100%',
      data: {inModal: true},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.addItem();
      const item = this.items.controls[this.items.controls.length - 1];
      if (item instanceof FormGroup) {
        this.setItem(item, dialogResult);
      }
    });
  }

  selectContact($event: any, item: any) {
    const price = item.value.item.itemPrices.find( f => f.supplier.id === $event.id);
    item.value.item.itemPrice = price;
    item.patchValue({
      price: price.price,
      tax: price.tax,
    });
  }
}
