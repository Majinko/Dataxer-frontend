import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectProfit} from '../../../../../core/models/project';

@Component({
  selector: 'app-user-project-overview',
  templateUrl: './user-project-overview.component.html',
  styleUrls: ['./user-project-overview.component.scss']
})
export class UserProjectOverviewComponent implements OnInit {
  projectProfitsFinished: ProjectProfit[];
  projectProfitsUnfinished: ProjectProfit[];

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.userProjectOverview(this.route.parent.snapshot.paramMap.get('uid'), 2022).subscribe((r) => {
      this.isLoading = false;

      this.projectProfitsFinished = r.filter((project) => project.isFinish === true);
      this.projectProfitsUnfinished = r.filter((project) => project.isFinish === false);
    });
  }
}
