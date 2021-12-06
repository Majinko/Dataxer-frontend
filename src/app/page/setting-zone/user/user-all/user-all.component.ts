import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {UserOverview} from '../../../../core/models/userOverview';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.scss']
})
export class UserAllComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;

  pageSize = 15;
  userOverview: UserOverview[] = [];

  isLoadingResults = true;
  totalElements: number = 0;
  displayedColumns: string[] = ['name', 'startWork', 'years', 'hours', 'projectCount', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      filter: ''
    });
  }

  ngAfterViewInit(): void {
    this.paginate();
  }

  public paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page, this.formGroup.get('filter').valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.userService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.formGroup.get('filter').value
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.userOverview = data));
  }

  destroy(event: MouseEvent, uid: string) {
    event.stopPropagation();

    this.userService.destroy(uid).subscribe(r => {
      this.userOverview = this.userOverview.filter(user => user.uid !== uid);
    });
  }
}
