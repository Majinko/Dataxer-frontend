import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppPaginateData} from '../../../../../core/class/AppPaginateData';
import {MatTable} from '@angular/material/table';
import {Item} from '../../../../../core/models/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../../../core/services/item.service';
import {ItemPriceService} from '../../../../../core/services/item-price.service';
import {MatDialog} from '@angular/material/dialog';
import {ItemSupplierPricesDialogComponent} from '../../item-supplier-prices-dialog.component';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MessageService} from '../../../../../core/services/message.service';
import {ItemMargeService} from '../../../../../core/services/item-marge.service';

@Component({
  selector: 'app-item-prices-table',
  templateUrl: './item-prices-table.component.html',
  styleUrls: ['./item-prices-table.component.scss']
})
export class ItemPricesTableComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'icons', 'voc', 'moc', 'marge', 'price', 'currentTo', 'actions'];
  marge;

  @Input() item: Item;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private itemPriceService: ItemPriceService,
    private itemService: ItemService,
    private itemMargeService: ItemMargeService,
    private messageService: MessageService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMarge();
  }

  newSupplier() {
    const dialogRef = this.dialog.open(ItemSupplierPricesDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      autoFocus: false,
      disableClose: true
    });

    this.handleDialogClose(dialogRef);
  }

  edit($event: MouseEvent, element) {
    if ($event) {
      $event.stopPropagation();
    }

    const dialogRef = this.dialog.open(ItemSupplierPricesDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        element
      },
      autoFocus: false,
      disableClose: true
    });

    this.handleDialogClose(dialogRef);
  }

  handleDialogClose(dialogRef: any) {
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        result.itemPrice.itemId = this.item.id;

        this.itemPriceService.store(result.itemPrice).subscribe((itemPrice) => {
          this.getItem();
        });
      }
    });
  }

  setBan(element) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '100%',
      maxWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.itemPriceService.setBan(element.id).subscribe(r => {
          this.getItem();
        });
      }
    });
  }

  setDefault(element) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '100%',
      maxWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.itemPriceService.setDefaultSupplier(element.id, this.item.id).subscribe(r => {
          this.getItem();
        });
      }
    });
  }

  private getItem(){
    let id: number;
    if (this.route.snapshot.paramMap.get('item_id')) {
      id = +this.route.snapshot.paramMap.get('item_id');
    } else if (this.route.snapshot.paramMap.get('id')) {
      id = +this.route.snapshot.paramMap.get('id');
    }
    this.itemService.getById(id).subscribe(item => {
      this.item = item;
    });
  }

  private getMarge() {
    this.itemMargeService.get().subscribe(r => {
      if (r) {
        console.log(r);
        this.marge = r;
      }
    }, error => {
      this.messageService.add('Nastala chyba');
    });
  }
}

