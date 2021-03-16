import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {UserOverview} from '../../../../core/models/userOverview';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.scss']
})
export class UserAllComponent implements OnInit {
  userOverview: UserOverview[] = [];

  isLoadingResults = true;
  displayedColumns: string[] = ['name', 'startWork', 'years', 'hours', 'projectCount', 'actions'];


  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.overview().subscribe(users => {
      this.userOverview = users;

      this.isLoadingResults = false;
    });
  }

  destroy(event: MouseEvent, uid: string) {
    event.stopPropagation();

    this.userService.destroy(uid).subscribe(r => {
      this.userOverview = this.userOverview.filter(user => user.uid !== uid);
    });
  }
}
