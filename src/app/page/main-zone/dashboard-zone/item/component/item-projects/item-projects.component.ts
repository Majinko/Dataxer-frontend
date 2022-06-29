import {Component, Input, OnInit} from '@angular/core';
import {Item, ItemInProjectDTO} from '../../../../../../core/models/item';
import {AppPaginateData} from '../../../../../../core/class/AppPaginateData';
import {MatDialog} from '@angular/material/dialog';
import {ItemProjectsDialogComponent} from '../item-projects-dialog/item-projects-dialog.component';
import {ItemService} from '../../../../../../core/services/item.service';

@Component({
  selector: 'app-item-projects',
  templateUrl: './item-projects.component.html',
  styleUrls: ['./item-projects.component.scss']
})
export class ItemProjectsComponent extends AppPaginateData<any> implements OnInit {
  displayedColumns: string[] = ['name', 'count', 'price'];
  itemInProjects: ItemInProjectDTO[] = [];

  @Input() item: Item;

  constructor(
    private dialog: MatDialog,
    private itemService: ItemService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProjects();
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

  private getProjects(): void {
    this.itemService.findAllByItemInBudget(this.item.id).subscribe((items) => {
      this.itemInProjects = items;
    });
  }
}
