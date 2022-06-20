import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';
import {ItemProjectsDialogComponent} from '../item-projects-dialog/item-projects-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ItemSupplierDialogComponent} from '../item-supplier-dialog/item-supplier-dialog.component';

@Component({
  selector: 'app-item-suppliers',
  templateUrl: './item-suppliers.component.html',
  styleUrls: ['./item-suppliers.component.scss']
})
export class ItemSuppliersComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'count', 'price', 'actions'];
  data = [
    {
      contractor: {
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
      count: 68,
      price: 280.25,
    }
  ];

  @Input() item: Item;

  constructor(
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  show($event: MouseEvent | null, element: any) {
    if ($event) {
      $event.stopPropagation();
    }
    this.dialog.open(ItemSupplierDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        element
      },
      autoFocus: false,
    });
  }

}
