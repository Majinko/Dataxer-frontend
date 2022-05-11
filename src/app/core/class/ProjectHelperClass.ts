import {ProjectService} from '../services/project.service';
import {Project} from '../models/project';
import {ActivatedRoute} from '@angular/router';

export class ProjectHelperClass {
  project: Project;

  constructor(
    protected route: ActivatedRoute,
    protected projectService: ProjectService
  ) {
  }

  protected getProject() {
    this.projectService.getById(+this.route.parent.snapshot.paramMap.get('id')).subscribe((project) => {
      this.project = project;
    });
  }
}
