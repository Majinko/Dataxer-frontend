import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-god-button',
  templateUrl: './god-button.component.html',
  styleUrls: ['./god-button.component.scss']
})
export class GodButtonComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) readonly godButtonService: GodButtonService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigate() {
    if (!this.godButtonService.showModal) {
      this.router.navigate([this.godButtonService.routerLink]).then();
    } else {
      this.dialog.open(this.godButtonService.component, {
        width: '100%',
        maxWidth: '500px',
        autoFocus: false,
      })
    }
  }
}
