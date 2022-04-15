import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../../../core/services/project.service';
import {ProjectEvaluation} from '../../../../../../core/models/project';
import {ProjectEvaluationExpansionPanelComponent} from './components/project-evaluation-expansion-panel/project-evaluation-expansion-panel.component';

@Component({
  selector: 'app-project-category-evaluation',
  templateUrl: './project-category-evaluation.component.html',
  styleUrls: ['./project-category-evaluation.component.scss']
})
export class ProjectCategoryEvaluationComponent implements OnInit {
  projectId: number;
  componentRefs: any[] = [];
  isLoadingResults: boolean = true;
  projectEvaluation: ProjectEvaluation[] = [];

  @ViewChild('adHost', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.projectId = +this.route.parent.snapshot.paramMap.get('id');

    this.projectService.getProjectEvaluation(this.projectId).subscribe(projectEvaluation => {
      this.isLoadingResults = false;
      this.projectEvaluation = projectEvaluation;
    });
  }

  loadData(categoryId: number) {
    this.entry.clear();

    this.isLoadingResults = true;

    this.projectService.getProjectEvaluation(this.projectId, categoryId).subscribe(projectEvaluation => {
      const factory = this.resolver.resolveComponentFactory(ProjectEvaluationExpansionPanelComponent);
      const componentRef = this.entry.createComponent(factory);

      componentRef.instance.projectEvaluation = projectEvaluation;
      componentRef.instance.isLoad = false;

      this.isLoadingResults = false;
    });
  }
}
