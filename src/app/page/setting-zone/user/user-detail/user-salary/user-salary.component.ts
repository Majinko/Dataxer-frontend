import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Salary} from '../../../../../core/models/salary';
import {SalaryService} from '../../../../../core/services/salary.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {User} from '../../../../../core/models/user';
import {GodButtonService} from '../../../../../core/services/god-button.service';
import {UserSalaryDialogComponent} from './components/user-salary-dialog/user-salary-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-salary',
  templateUrl: './user-salary.component.html',
  styleUrls: ['./user-salary.component.scss']
})
export class UserSalaryComponent implements OnInit, OnDestroy {
  user: User;
  salaries: Salary[] = [];
  isLoadingResults: boolean = true;

  displayedColumns: string[] = ['price', 'from', 'to', 'type', 'actions'];

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private userService: UserService,
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.godButtonService.title = 'Pridať mzdu';
    this.godButtonService.showModal = true;
    this.godButtonService.component = UserSalaryDialogComponent;

    this.handleUpdateOrStore();
    this.getUserSalaries();
    this.getUser();
  }

  private handleUpdateOrStore() {
    this.salaryService.storeOrUpdate.subscribe(() => {
      this.getUserSalaries();

      this.dialog.closeAll();
    });
  }

  private getUser() {
    this.userService.findByUid(this.route.parent.snapshot.paramMap.get('uid')).subscribe(u => {
      this.user = u;

      this.godButtonService.data = {user: u};
    });
  }

  private getUserSalaries() {
    this.salaryService.getUserSalaries(this.route.parent.snapshot.paramMap.get('uid'), 'desc').subscribe(salaries => {
      this.salaries = salaries;
      this.isLoadingResults = false;
    });
  }

  destroy(id: number) {

  }

  ngOnDestroy(): void {
    this.godButtonService.title = 'Nový používateľ';
    this.godButtonService.routerLink = '/setting/user/create';

    this.godButtonService.showModal = false;
    this.godButtonService.component = null;
    this.godButtonService.data = null;
  }

  edit(salary: Salary) {
    this.dialog.open(UserSalaryDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        user: this.user,
        salary
      }
    });
  }
}
