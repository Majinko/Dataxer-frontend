import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProjectHelperClass} from '../../../../../../core/class/ProjectHelperClass';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../../../core/services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {
  ProjectBudgetItemsComponent
} from '../project-budget/components/project-budget-items/project-budget-items.component';
import {BudgetService} from '../../../../../../core/services/budget.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {BudgetOverview} from '../../../../../../core/models/budget';

@Component({
  selector: 'app-project-budget-refakt',
  templateUrl: './project-budget-refakt.component.html',
  styleUrls: ['./project-budget-refakt.component.scss']
})
export class ProjectBudgetRefaktComponent extends ProjectHelperClass implements OnInit {
  isLoadingResults: boolean = true;
  budgetOverview: BudgetOverview[] = [];

  @ViewChild('adHost', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private dialog: MatDialog,
    private budgetService: BudgetService,
    private messageService: MessageService,
    protected route: ActivatedRoute,
    protected projectService: ProjectService,
  ) {
    super(route, projectService);
  }

  ngOnInit(): void {
    this.getProject();
    this.getByProject();
  }

  private getByProject() {
    this.budgetService.getByProjectId(+this.route.parent.snapshot.paramMap.get('id')).subscribe(budgetOverview => {
      this.isLoadingResults = false;

      this.budgetOverview = budgetOverview;
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
}
