import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppPaginateData} from '../../../../../core/class/AppPaginateData';
import {MatTable} from '@angular/material/table';
import {Item, ItemPrice} from '../../../../../core/models/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../../../core/services/item.service';
import {ItemPriceService} from '../../../../../core/services/item-price.service';
import {MatDialog} from '@angular/material/dialog';
import {ItemSupplierPricesDialogComponent} from '../../item-supplier-prices-dialog.component';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MessageService} from '../../../../../core/services/message.service';
import {ItemMargeService} from '../../../../../core/services/item-marge.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-prices-table',
  templateUrl: './item-prices-table.component.html',
  styleUrls: ['./item-prices-table.component.scss']
})
export class ItemPricesTableComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'icons', 'voc', 'moc', 'marge', 'price', 'currentTo', 'actions'];
  marge;

  @Input() item: Item;
  @Input() createItem: boolean = false;
  @Input() formGroup: FormGroup;
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

      if (result && !this.createItem) {
        result.itemPrice.itemId = this.item.id;

        this.itemPriceService.store(result.itemPrice).subscribe((itemPrice) => {
          this.getItem();
        });
      } else if (result && this.createItem) {
        if (!this.item) {
          // tslint:disable-next-line:new-parens
          this.item = new Item;
        }
        if (!this.item.itemPrices) {
          this.item.itemPrices = [];
        }
        if (this.item.itemPrices.length === 0) {
          this.item.itemPrices.push(result.itemPrice);
        } else {
          this.item.itemPrices = this.item.itemPrices.filter( f => f.supplier.id !== result.itemPrice.supplier.id);
          this.item.itemPrices.push(result.itemPrice);
        }

        this.formGroup.get('itemPrices').patchValue(this.item.itemPrices);

        this.table?.renderRows();
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
      this.table?.renderRows();
    });
  }

  private getMarge() {
    this.itemMargeService.get().subscribe(r => {
      if (r) {
        this.marge = r;
      }
    }, error => {
      this.messageService.add('Nastala chyba');
    });
  }

  delete(element) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '100%',
      maxWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.itemPriceService.delete(element.id).subscribe(r => {
          this.messageService.add('Dodávateľ bol z položky vymazaný');
          this.getItem();
        }, error => {
          this.messageService.add('Nastala chyba, nepodarilo sa vymazať dodávateľa');
        });
      }
    });
  }
}

