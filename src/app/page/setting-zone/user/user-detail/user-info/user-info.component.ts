import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserOverview} from '../../../../../core/models/userOverview';
import {SalaryService} from '../../../../../core/services/salary.service';
import {Salary} from '../../../../../core/models/salary';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userOverview: UserOverview;
  salaries: Salary[] = [];

  constructor(
    private userService: UserService,
    private salaryService: SalaryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserSalaries();
  }

  private getUserData() {
    this.userService.userOverview(this.route.snapshot.paramMap.get('uid')).subscribe(u => {
      this.userOverview = u;
    });
  }

  private getUserSalaries() {
    this.salaryService.getUserSalaries(this.route.snapshot.paramMap.get('uid')).subscribe(salaries => {
      this.salaries = salaries;
    });
  }
}
