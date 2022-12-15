import {Component, OnInit} from '@angular/core';
import {TimeService} from '../../../../main-zone/dashboard-zone/time/time.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-time',
  templateUrl: './user-time.component.html',
  styleUrls: ['./user-time.component.scss']
})
export class UserTimeComponent implements OnInit {

  constructor(
    private timeService: TimeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.timeService.getAllByUser(this.route.parent.snapshot.paramMap.get('uid')).subscribe((t) => {

    });
  }

}
