import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  Input,
  OnInit
} from '@angular/core';
import {BudgetOverview} from '../../../../../../../../core/models/budget';
import {ActivatedRoute} from '@angular/router';
import {BudgetService} from '../../../../../../../../core/services/budget.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-project-budget-expansions-panel',
  templateUrl: './project-budget-expansions-panel.component.html',
  styleUrls: ['./project-budget-expansions-panel.component.scss']
})
export class ProjectBudgetExpansionsPanelComponent implements OnInit {
  @Input() budgetOverview: BudgetOverview[] = [];
  @Input() checkboxData;
  @Input() checkboxDataSubject = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
  }

  ngOnInit(): void {
  }

  loadData(categoryId: number, entry: HTMLDivElement) {
    if (entry.childElementCount === 0) {
      this.budgetService.getByProjectId(+this.route.parent.snapshot.paramMap.get('id'), categoryId).subscribe(budgetOverview => {
        const factory = this.resolver.resolveComponentFactory(ProjectBudgetExpansionsPanelComponent).create(this.injector);

        factory.instance.budgetOverview = budgetOverview;
        factory.instance.checkboxData = this.checkboxData;
        factory.instance.checkboxDataSubject = this.checkboxDataSubject;

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(factory.hostView);

        // 3. Get DOM element from component
        const domElem = (factory.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        entry.appendChild(domElem);
      });
    }
  }
}
