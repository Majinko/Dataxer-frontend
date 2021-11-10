import {Component, OnInit} from '@angular/core';
import {PackService} from '../../../../core/services/pack.service';
import {ActivatedRoute} from '@angular/router';
import {Pack, PackItem} from '../../../../core/models/pack';
import {StorageService} from '../../../../core/services/storage.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-pack-show',
  templateUrl: './pack-show.component.html',
  styleUrls: ['./pack-show.component.scss']
})
export class PackShowComponent implements OnInit {
  pack: Pack;

  constructor(
    private packService: PackService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.getPack();
  }

  getPack() {
    this.packService.getById(+this.route.snapshot.paramMap.get('pack_id')).subscribe((pack) => {
      this.pack = pack;

      this.preparePackPrice(pack);
    });
  }

  private preparePackItemImage(packItems: PackItem[]) {
    packItems.forEach(item => {
      this.storageService.getPreviewImage(item.item.id, 'item').subscribe(response => {
        if (response) {
          this.storage.ref(response.path).getDownloadURL().subscribe(url => {
            //item.item.preview = url;
          });
        }
      });
    });
  }

  private preparePackPrice(pack: Pack) {
    pack.price = 0;

    pack.packItems.forEach(item => {
      pack.price += +item.item.itemPrice.price;
    });
  }
}
