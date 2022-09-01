import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProjectHelperClass} from '../../../../../../core/class/ProjectHelperClass';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../../core/services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {
  ProjectBudgetItemsComponent
} from '../project-budget/components/project-budget-items/project-budget-items.component';
import {BudgetService} from '../../../../../../core/services/budget.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {BudgetOverview} from '../../../../../../core/models/budget';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-project-budget-refakt',
  templateUrl: './project-budget-refakt.component.html',
  styleUrls: ['./project-budget-refakt.component.scss']
})
export class ProjectBudgetRefaktComponent extends ProjectHelperClass implements OnInit {
  isLoadingResults: boolean = true;
  budgetOverview: BudgetOverview[] = [];
  checkboxData = [];
  checkboxDataSubject = new Subject<boolean>();

  @ViewChild('adHost', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private router: Router,
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
          this.getByProject();
          this.isLoadingResults = false;
          this.messageService.add('Budget bol uložený.');
        });
      }
    });
  }

  createInvoice() {
    this.checkboxDataSubject.next(true);
    const id = +this.route.parent.snapshot.paramMap.get('id');
    this.router.navigate(['invoice/create/INVOICE', { projectId: id, itemIds: this.checkboxData.toString()}]).then();
  }
}
