import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../../core/services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-evaluation',
  templateUrl: './project-evaluation.component.html',
  styleUrls: ['./project-evaluation.component.scss']
})
export class ProjectEvaluationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectService.getEvaluation(+this.route.parent.snapshot.paramMap.get('id')).subscribe((evaluation) => {
      console.log(evaluation);
    });
  }
}
