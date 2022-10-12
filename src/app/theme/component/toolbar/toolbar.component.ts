import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../../core/services/company.service';
import {SearchBarService} from '../../../core/services/search-bar.service';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() showSearchBar = true;
  public notificationCount: number = 0;

  constructor(
    public readonly companyService: CompanyService,
    public readonly searchBarService: SearchBarService,
    private readonly notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    // todo nacitata notifikacie
    //this.notificationService.openWebSocket();

    this.notificationService.newNotification.subscribe(count => {
      this.notificationCount++;
    });
  }
}
