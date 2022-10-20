import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Salary} from '../../../../../core/models/salary';
import {SalaryService} from '../../../../../core/services/salary.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {User} from '../../../../../core/models/user';
import {GodButtonService} from '../../../../../core/services/god-button.service';
import {UserSalaryDialogComponent} from './components/user-salary-dialog/user-salary-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from "../../../../../core/services/message.service";
import {MatTable} from "@angular/material/table";

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

  @ViewChild(MatTable) table!: MatTable<Salary>;

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private userService: UserService,
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private messageService: MessageService
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
      this.table?.renderRows();
    });
  }

  destroy(id: number) {
    this.salaryService.destroy(id).subscribe(r => {
      this.messageService.add('Mzda bola odstránená');
      this.getUserSalaries();
    }, error => {
      this.messageService.add('Mzdu sa nepodarilo odstrániť');
    });
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
