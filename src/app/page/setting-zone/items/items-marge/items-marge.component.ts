import { Component, OnInit } from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-items-marge',
  templateUrl: './items-marge.component.html',
  styleUrls: ['./items-marge.component.scss']
})
export class ItemsMargeComponent implements OnInit {
  value: number = 10;
  highValue: number = 20;
  options: Options = {
    floor: 5,
    ceil: 100,
    step: 1,
    minRange: 1,
    minLimit: 6,
  };

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    const formData = {
      marge1: this.value,
      marge2: this.highValue
    };
    console.log(formData);
  }
}
