import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss']
})
export class MenuTabComponent implements OnInit {
  activeLinkIndex: number = 0;

  @Input() navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.init();
    this.prepareLinks();
    this.setActiveIndex();
  }

  private prepareLinks() {

  }

  private init() {
    this.router.events.subscribe((res) => {
      this.setActiveIndex();
    });
  }

  private setActiveIndex() {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
  }
}
