import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';

@Component({
  selector: 'app-god-button',
  templateUrl: './god-button.component.html',
  styleUrls: ['./god-button.component.scss']
})
export class GodButtonComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) readonly godButtonService: GodButtonService
  ) {
  }

  ngOnInit() {
  }
}
