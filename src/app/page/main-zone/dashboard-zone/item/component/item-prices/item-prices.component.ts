import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';
import {ItemNewSupplierDialogComponent} from '../item-new-supplier-dialog/item-new-supplier-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import {ItemPriceService} from '../../../../../../core/services/item-price.service';

@Component({
  selector: 'app-item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.scss']
})
export class ItemPricesComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'icons', 'voc', 'moc', 'marge', 'price', 'currentTo', 'actions'];

  @Input() item: Item;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private itemPriceService: ItemPriceService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  newSupplier() {
    const dialogRef = this.dialog.open(ItemNewSupplierDialogComponent, {
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

    const dialogRef = this.dialog.open(ItemNewSupplierDialogComponent, {
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
          this.item.itemPrices = this.item.itemPrices.concat(itemPrice);
        });
      }
    });
  }
}
