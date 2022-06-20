import {Component, OnInit} from '@angular/core';
import {Item} from '../../../../../core/models/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../../../core/services/item.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {UploadHelper} from '../../../../../core/class/UploadHelper';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.scss'],
  providers: [UploadHelper],
})
export class ItemShowComponent implements OnInit {
  formGroup: FormGroup;
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private storageService: StorageService,
    public uploadHelper: UploadHelper,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getItem();
    this.getItemImage();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      itemPrices: null
    });
  }

  private getItem(){
    this.itemService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
    });
  }

  private getItemImage() {
    this.storageService.getPreviewImage(+this.route.snapshot.paramMap.get('id'), 'item').subscribe(r => {
      if (r) {
        this.uploadHelper.prepareItemUrl(r.path);
      }
    });
  }

  save() {
    console.log(this.formGroup.value);
  }
}
