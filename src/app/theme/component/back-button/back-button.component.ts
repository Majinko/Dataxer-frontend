import {Component, Input, OnInit} from '@angular/core';
import {PreviousRouteService} from '../../../core/services/previous-route.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent implements OnInit {
  @Input() url: string = null;

  constructor(
    private previousRouteService: PreviousRouteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.previousRouteService.getPreviousUrl() !== null && this.previousRouteService.getPreviousUrl() !== this.router.url) {
      this.url = this.previousRouteService.getPreviousUrl();
    }
  }
}
