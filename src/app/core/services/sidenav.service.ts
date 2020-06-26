import {Injectable} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  opened = true;
  mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 576px)');

    this.opened = !this.mobileQuery.matches;
  }
}
