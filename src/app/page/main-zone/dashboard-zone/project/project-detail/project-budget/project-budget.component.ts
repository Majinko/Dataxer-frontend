import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Pack, PackItem} from '../../../../../../core/models/pack';
import {ProjectBudgetItemsComponent} from './components/project-budget-items/project-budget-items.component';
import {ProjectBudgetSettingsComponent} from './components/project-budget-settings/project-budget-settings.component';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../../../../core/models/project';
import {ProjectHelperClass} from '../../../../../../core/class/ProjectHelperClass';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../../../core/services/project.service';
import {BudgetService} from '../../../../../../core/services/budget.service';
import {MessageService} from '../../../../../../core/services/message.service';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent extends ProjectHelperClass implements OnInit, AfterViewChecked {
  formGroup: FormGroup;
  budgetItems: Pack[] = [];
  allComplete = false;
  project: Project;
  isLoadingResults: boolean = false;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private messageService: MessageService,
    protected route: ActivatedRoute,
    protected projectService: ProjectService
  ) {
    super(route, projectService);
  }

  @ViewChild('allCheck', {static: false}) allCheck: MatCheckbox;

  ngOnInit(): void {
    this.getProject();
    this.getByProject();
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

  private getByProject() {
    this.budgetService.getByProjectId(+this.route.parent.snapshot.paramMap.get('id')).subscribe(budget => {
      console.log(budget);
    });
  }

  dialogItems() {
    const dialogRef = this.dialog.open(ProjectBudgetItemsComponent, {
      width: '100%',
      data: {
        project: this.project
      },
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.project && dialogResult.packs.length) {
        this.isLoadingResults = true;

        this.budgetService.store(dialogResult).subscribe(() => {
          this.isLoadingResults = false;

          this.messageService.add('Budget bol uložený.');
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

    return (checked > 0 || indeterminate > 0) && !this.allComplete;
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
