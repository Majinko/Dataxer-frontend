import { Component, OnInit } from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-items-marge',
  templateUrl: './items-marge.component.html',
  styleUrls: ['./items-marge.component.scss']
})
export class ItemsMargeComponent implements OnInit {
  value: number = 10;
  start: number = 5;
  highValue: number = 20;
  show = true;
  options: Options = {
    floor: this.start,
    ceil: 100,
    step: 1,
    minRange: 1,
    minLimit: this.start + 1,
  };

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    const formData = {
      marge1: this.start,
      marge2: this.value,
      marge3: this.highValue
    };
    console.log(formData);
  }

  inputChanged($event: any) {
    if ($event > 98) {
      this.start = 98;
    }
    this.options = {
      floor: this.start,
      ceil: 100,
      step: 1,
      minRange: 1,
      minLimit: this.start + 1,
    };
  }
}
