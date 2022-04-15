import {Component, OnInit} from '@angular/core';
import {Item} from '../../../../../core/models/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../../../core/services/item.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {UploadHelper} from '../../../../../core/class/UploadHelper';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.scss'],
  providers: [UploadHelper],
})
export class ItemShowComponent implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private storageService: StorageService,
    public uploadHelper: UploadHelper,
  ) {
  }

  ngOnInit(): void {
    this.getItem();
    this.getItemImage();
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
}
