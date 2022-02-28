import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Pack, PackItem} from '../../../../../core/models/pack';
import {ProjectBudgetItemsComponent} from './components/project-budget-items/project-budget-items.component';
import {ProjectBudgetSettingsComponent} from './components/project-budget-settings/project-budget-settings.component';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit {
  budgetItems: Pack[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  dialogItems() {
    const dialogRef = this.dialog.open(ProjectBudgetItemsComponent, {
      width: '100%',
      maxWidth: '1500px',
      data: {
        budgetItems: this.budgetItems
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.budgetItems = dialogResult.packs;
        this.budgetItems.forEach( f => {
          f.packItems.forEach( p => {
            p.packBudget = {
              dueAtDays: 2,
              paymentDate: undefined,
              totalPrice: 0,
              paymentPrice: 0,
              state: 'waiting'
            };
          });
        });
      }
    });
  }

  settingBudget(item: PackItem) {
    const dialogRef = this.dialog.open(ProjectBudgetSettingsComponent, {
      width: '100%',
      maxWidth: '1500px',
      data: {
        budgetItems: this.budgetItems
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.budgetItems = dialogResult.packs;
      }
    });
  }
}
