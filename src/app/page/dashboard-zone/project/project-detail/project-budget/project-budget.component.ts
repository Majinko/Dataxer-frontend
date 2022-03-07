import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Pack, PackItem} from '../../../../../core/models/pack';
import {ProjectBudgetItemsComponent} from './components/project-budget-items/project-budget-items.component';
import {ProjectBudgetSettingsComponent} from './components/project-budget-settings/project-budget-settings.component';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit, AfterViewChecked {
  formGroup: FormGroup;
  budgetItems: Pack[] = [];
  allComplete = false;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) { }

  @ViewChild('allCheck', { static: false }) allCheck: MatCheckbox;

  ngOnInit(): void {
    this.prepareForm();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contacts: [null, Validators.required],
    });
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
      maxWidth: '1000px',
      data: {
        item,
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

  someComplete(pack: Pack): boolean {
     pack.totalCheck = pack.packItems.filter(t => t.checked).length;
     return pack.packItems.filter(t => t.checked).length > 0 && !pack.allComplete;
  }

  changeCheckbox($event: MatCheckboxChange, item: PackItem, pack: Pack): void {
    item.checked = !!$event.checked;
    pack.allComplete = pack.packItems.every(t => t.checked);
  }

  indeterminateChange($event: boolean, pack: Pack) {
    pack.indeterminate = $event;
  }

  setAll(checked: boolean, pack: Pack): void {
    pack.allComplete = checked;
    pack.packItems.forEach(t => t.checked = checked);
  }

  someCompleteAll() {
    const checked = this.budgetItems.filter(t => t.allComplete).length;
    const indeterminate = this.budgetItems.filter(t => t.indeterminate).length;
    const complete = checked === this.budgetItems.length;

    if (complete !== this.allComplete) {
      this.allComplete = complete;
    }

    return (checked > 0 || indeterminate > 0 ) && !this.allComplete;
  }

  setAllItems(checked: boolean) {
    this.allComplete = checked;
    this.budgetItems.forEach(t => {
      t.allComplete = checked;
      this.setAll(checked, t);
    });
  }

  saveContacts() {
    this.budgetItems.forEach(pack => {
      pack.packItems.forEach(item => {
        if (item.checked) {
          item.contacts = this.formGroup.value.contacts;
        }
      });
    });
    console.log(this.budgetItems);
  }
}
