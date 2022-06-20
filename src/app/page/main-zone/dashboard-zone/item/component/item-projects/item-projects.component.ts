import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';
import {ItemNewSupplierDialogComponent} from "../item-new-supplier-dialog/item-new-supplier-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ItemProjectsDialogComponent} from "../item-projects-dialog/item-projects-dialog.component";

@Component({
  selector: 'app-item-projects',
  templateUrl: './item-projects.component.html',
  styleUrls: ['./item-projects.component.scss']
})
export class ItemProjectsComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'count', 'price', 'actions'];
  data = [
    {
      project: {
        id: 246,
        title: 'Byt 4i Kaskády 1.3.1'
      },
      count: 3,
      price: 28.25,
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

  show($event: MouseEvent, element: any) {
    if ($event) {
      $event.stopPropagation();
    }
    this.dialog.open(ItemProjectsDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        element,
        item: this.item
      },
      autoFocus: false,
    });
  }
}
