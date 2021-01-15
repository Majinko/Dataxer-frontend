import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent implements OnInit {
  @Input() text: string = 'Uložiť';
  @Input() loading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
