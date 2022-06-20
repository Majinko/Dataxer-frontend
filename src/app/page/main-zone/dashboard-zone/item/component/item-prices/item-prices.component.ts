import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';
import {ItemNewSupplierDialogComponent} from '../item-new-supplier-dialog/item-new-supplier-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.scss']
})
export class ItemPricesComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'currentTo', 'actions'];
  data = [
    {
      supplier: {
        id: 267,
        name: 'Jakub Homola',
        photoUrl: null,
        street: null,
        city: '',
        country: '',
        postalCode: null,
        regNumber: null,
        email: null,
        phone: '+421 902 802 271',
        cin: null,
        tin: null,
        vatin: null
      },
      itemPrice: {
        price: 28.25,
        tax: 20,
        priceTax: 0,
        wholesalePrice: 0,
        wholesaleTax: 20,
        wholesalePriceTax: 0,
        marge: 0,
        surcharge: 0,
      },
      currentTo: '12.5.2023'
    }
  ];

  @Input() item: Item;
  @Input() formGroup?: FormGroup;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.patchData();
  }

  newSupplier() {
    const dialogRef = this.dialog.open(ItemNewSupplierDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          supplier: result.supplier,
          itemPrice: {
            price: result.itemPrice.price,
            tax: result.itemPrice.tax,
            priceTax: result.itemPrice.priceTax,
            wholesalePrice: result.itemPrice.wholesalePrice,
            wholesaleTax: result.itemPrice.wholesaleTax,
            wholesalePriceTax: result.itemPrice.wholesalePriceTax,
            marge: result.itemPrice.marge,
            surcharge: result.itemPrice.surcharge,
          },
          currentTo: '20.5.2023'
        };
        this.data.push(data);
        this.patchData();
        this.table.renderRows();
      }
    });
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.itemPrice = result.itemPrice;
        element.supplier = result.supplier;
        this.patchData();
      }
    });
  }

  private patchData() {
    this.formGroup.get('itemPrices').patchValue(this.data);
  }
}
