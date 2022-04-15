import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {
  private currentUrl: string = null;
  private previousUrl: string = null;
  private previousUrls: string[] = [];

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public getPreviousUrls() {
    return this.previousUrls;
  }
}
