import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {DocumentHelper} from '../../../core/class/DocumentHelper';
import {Pack} from '../../../core/models/pack';
import {PackService} from '../../../core/services/pack.service';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {CategoryService} from '../../../core/services/category.service';
import {Project} from '../../../core/models/project';
import {DocumentPackHelpers} from '../../../core/class/DocumentPackHelpers';

@Component({
  selector: 'app-document-pack',
  templateUrl: './document-pack.component.html',
  styleUrls: ['./document-pack.component.scss'],
})
export class DocumentPackComponent extends DocumentPackHelpers implements OnInit {
  categories: CategoryItemNode[];

  @Input() packs: Pack[];
  @Input() formGroup: FormGroup;
  @Input() documentId: number;
  @Input() projects: Project[];
  @Input() documentHelper: DocumentHelper;

  constructor(
    protected formBuilder: FormBuilder,
    private packService: PackService,
    private categoryService: CategoryService,
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.documentHelper.handlePackChanges(this.f.packs);
    this.preparePack();
    this.getCategories();

    setTimeout(() => {
      if (this.packs) {
        this.formGroup.patchValue({packs: this.packs});
      }
    }, 1);
  }

  private getCategories() {
    this.categoryService.all(true).subscribe((categories) => {
      this.categories = categories;
    });
  }

  // set pack when find it
  setPack(packIndex: number, packFormGroup: AbstractControl, pack: Pack) {
    this.packService.getById(pack.id).subscribe(p => {
        this.setPackData(packIndex, packFormGroup, p);
      }
    );
  }

  // show hide pack item
  showHidePackItems(index: number) {
    this.documentHelper.packs[index].showItems = !this.documentHelper.packs[index].showItems;
  }
}
