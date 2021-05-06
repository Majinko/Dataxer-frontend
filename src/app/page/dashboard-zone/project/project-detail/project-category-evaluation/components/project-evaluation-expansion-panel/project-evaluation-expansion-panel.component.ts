import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProjectEvaluation} from '../../../../../../../core/models/project';
import {ProjectService} from '../../../../../../../core/services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-evaluation-expansion-panel',
  templateUrl: './project-evaluation-expansion-panel.component.html',
  styleUrls: ['./project-evaluation-expansion-panel.component.scss']
})
export class ProjectEvaluationExpansionPanelComponent implements OnInit {
  isLoad: boolean = true;
  projectEvaluation: ProjectEvaluation[] = [];

  @ViewChild('adHost', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
  }

  ngOnInit(): void {
  }

  loadData(categoryId: number, entry: HTMLDivElement) {
    if (entry.childElementCount === 0) {
      this.isLoad = true;

      this.projectService.getProjectEvaluation(+this.route.parent.snapshot.paramMap.get('id'), categoryId).subscribe(projectEvaluation => {
        const factory = this.resolver.resolveComponentFactory(ProjectEvaluationExpansionPanelComponent).create(this.injector);

        factory.instance.projectEvaluation = projectEvaluation;
        factory.instance.isLoad = false;

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(factory.hostView);

        // 3. Get DOM element from component
        const domElem = (factory.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        entry.appendChild(domElem);

        // 5. stop load
        this.isLoad = false;
      });
    }
  }
}
