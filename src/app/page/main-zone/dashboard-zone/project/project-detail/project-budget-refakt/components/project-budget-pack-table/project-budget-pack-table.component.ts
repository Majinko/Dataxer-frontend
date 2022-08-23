import { Component, Input, OnInit } from '@angular/core';
import { BudgetPackItemOverview, BudgetPackOverview } from '../../../../../../../../core/models/budget';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-budget-pack-table',
  templateUrl: './project-budget-pack-table.component.html',
  styleUrls: ['./project-budget-pack-table.component.scss']
})
export class ProjectBudgetPackTableComponent implements OnInit {
  @Input() budgetPacksOverview: BudgetPackOverview[] = [];
  @Input() checkboxData;
  @Input() checkboxDataSubject = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    this.prepareItemsId();
  }

  changeCheckbox($event: MatCheckboxChange, item: BudgetPackItemOverview, pack: BudgetPackOverview): void {
    item.checked = !!$event.checked;
    pack.allComplete = pack.budgetPackItemsOverview.every(t => t.checked);
  }

  someComplete(pack: BudgetPackOverview) {
    return pack.budgetPackItemsOverview.filter(t => t.checked).length > 0 && !pack.allComplete;
  }

  indeterminateChange($event: boolean, pack: BudgetPackOverview) {
    pack.indeterminate = $event;
  }

  setAll(checked: boolean, pack: BudgetPackOverview) {
    pack.allComplete = checked;
    pack.budgetPackItemsOverview.forEach(t => t.checked = checked);
  }

  private prepareItemsId() {
    this.checkboxDataSubject.subscribe(() => {
      this.budgetPacksOverview.forEach(packs => {
        packs.budgetPackItemsOverview.forEach(item => {
          if (item.checked) {
            this.checkboxData.push(item.item.id);
          }
        });
      });
    });
  }
}
