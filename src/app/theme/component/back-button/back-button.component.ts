import {Component, Input, OnInit} from '@angular/core';
import {PreviousRouteService} from '../../../core/services/previous-route.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent implements OnInit {
  @Input() url: string = null;

  constructor(
    private previousRouteService: PreviousRouteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (
      this.route.snapshot.paramMap.get('backClick') === null && // another url to array ad only if not click back
      this.previousRouteService.getPreviousUrl() !== null &&
      this.previousRouteService.getPreviousUrl() !== this.router.url
    ) {
      if (!this.previousRouteService.getPreviousUrls().includes(this.previousRouteService.getPreviousUrl())) {
        this.previousRouteService.getPreviousUrls().push(this.previousRouteService.getPreviousUrl().replace(';backClick=true', ''));
      }
    }
  }

  removeClickedUrl() {
    const url = this.previousRouteService.getPreviousUrls()[this.previousRouteService.getPreviousUrls().length - 1];

    this.router.navigate([url ?? this.url, {backClick: true}]).then(() => {
      this.previousRouteService.getPreviousUrls().pop();
    });
  }
}
